import ADM_AppStores from './stores/ADM_AppStores.js';
import ADM_AppStoreGroups from './stores/ADM_AppStoreGroups.js';
import ADM_AppSettings from './stores/ADM_AppSettings.js';
import MAC_Colors from './stores/MAC_Colors.js';
import MAC_Fastening from './stores/MAC_Fastening.js';
import MAC_Materials from './stores/MAC_Materials.js';
import MAC_Products from './stores/MAC_Products.js';
import MAC_ProductTypes from './stores/MAC_ProductTypes.js';

import TheAppMap from './TheAppMap.js';
import TheMenu from './TheMenu.js';
import TableManager from './controls/TableManager.js';

export default {
  components: {
    TheAppMap,
    TheMenu,
    TableManager
  },

  data () {
    return {
      appName: 'Macrame',
      appTitle: 'Macrame',
      appVersion: '',
      dbName: 'Macrame',
      dbVersion: 1,
      dbDataVersion: 1,
      activeTabName: 'app-map',
      activeRepName: '',
      isTheMenuVisible: false,
      currentStore: null,
      storesInGroups: [],
      stores: {
        ADM_AppStores,
        ADM_AppStoreGroups,
        ADM_AppSettings,
        MAC_Colors,
        MAC_Fastening,
        MAC_Materials,
        MAC_Products,
        MAC_ProductTypes
      }
    }
  },

  async created() {
    this.appVersion = localStorage.getItem(`${this.dbName}_version`)
    await this.db.init(this.dbName, this.dbVersion, this.stores, this.log);
    await this.$_updateDbData();
    await this.$_createStoresInGroups();
  },

  methods: {
    async $_updateDbData() {
      const dataVersion = await this.db.getRecordById(this.stores.ADM_AppSettings, 1);

      // init
      if (!dataVersion) {
        const stores = [];
        for (const store of Object.values(this.stores))
          stores.push(store.schema);
  
        await this.db.insert(this.stores.ADM_AppStores, stores);
        await this.db.insert(this.stores.ADM_AppStoreGroups, [
          { id: 1, name: 'Administrace', icon: 'adm', index: 4, stores: [1, 2] },
          { id: 2, name: 'Moje Macrame', icon: 'macrame', index: 1, stores: [10, 11, 12, 13, 14] }
        ]);
        await this.db.insert(this.stores.ADM_AppSettings, [{ id: 1, dataVersion: this.dbDataVersion }]);

        return;
      }
      
      if (dataVersion.dataVersion === this.dbDataVersion) return;
    },

    async $_createStoresInGroups() {
      const stores = Object.values(this.stores);
      const groups = await this.db.data(this.stores.ADM_AppStoreGroups, { sorted: true });

      for (const group of groups) {
        this.storesInGroups.push({
          group: group,
          stores: group.stores.map(storeId => stores.find(s => s.schema.id === storeId))});
      }
    },

    $_closeTheMenu() {
      this.$refs.theMenu.isOpen = false;
    },

    $_theMenuItemSelected(mode, item) {
      switch (mode) {
        case 'app-map':
          this.activeTabName = 'app-map';
          this.appTitle = this.appName;
          break;
        case 'store':
          this.db.data(item, { sorted: true })
            .then(() => {
              this.currentStore = item;
              this.activeTabName = 'store';
              this.appTitle = item.schema.title;
            });
          break;
        case 'func':
          this.currentStore[item](this.db);
          break;
        case 'report':
          this.activeRepName = item.name;
          this.activeTabName = 'report';
          this.appTitle = item.title;
          break;
      }
    },

    $_isTabActive(tabName) {
      return this.activeTabName === tabName;
    }
  },

  template: `
    <div
      class="theMacrame flexColContainer"
      @click="$_closeTheMenu">
      <header>
        <the-menu
          ref="theMenu"
          :currentStore="currentStore"
          :storesInGroups="storesInGroups"
          @item-selected="$_theMenuItemSelected">
        </the-menu>

        <span
          id="title"
          class="rborder">
          {{ appTitle }}
        </span>

        <div id="toolBar">
          <div
            class="toolBarIcon"
            v-if="$_isTabActive('store')"
            @click="() => $refs.theStore.$_editRecNew()">
            ✹
          </div>
        </div>

        <span class="version">
          {{ appVersion }}
        </span>
      </header>

      <div class="mainContent">

        <the-app-map
          v-if="$_isTabActive('app-map')"
          :storesInGroups="storesInGroups"
          @storeSelected="$_theMenuItemSelected">
        </the-app-map>

        <table-manager
          ref="theStore"
          v-if="$_isTabActive('store')"
          :store="currentStore">
        </table-manager>

        <component
          v-if="$_isTabActive('report')"
          :is="activeRepName">
        </component>

      </div>
    </div>`
}