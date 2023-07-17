<template>
  <div class="grid-container">
    <div class="column">
      <div v-for="(value, key) in permission" :key="key" class="grid-item">
        <button v-if="value.title" :class="{ selected: value.showChildren }" @click="toggleChildren(value)" class="permission__button button">
          <checkbox :rootPermission="rootPermission[key]" :permission="permission" :action-key="key" :parent-key="key" @change="handleCheckboxChange(permission[key], actionKey, key)" ></checkbox>
          <p>{{ value.title }}</p>
          <img class="arrow" src="../assets/images/icons/right.svg" alt="Arrow" />
        </button>
      </div>
    </div>
    <div class="childrens">
      <div v-for="(value, key) in permission" :key="key" class="grid-children">
        <div v-if="value.showChildren">
          <permission v-if="value.items" :permission="value.items" :level="level + 1" :root-permission="rootPermission[key]"></permission>

          <div v-if="value.action">
            <div class="grid-item">
              <button v-for="(actionValue, actionKey) in value.action" :key="actionKey" class="permission__button button">
                <checkbox :rootPermission="rootPermission[key]" :permission="permission" :action-key="actionKey" :parent-key="key" @change="handleCheckboxChange(permission[key], actionKey, key)"></checkbox>
                {{ actionKey }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from 'vue';
import Checkbox from '../components/Checkbox.vue';

export default defineComponent({
  name: 'Permission',
  components: {
    Checkbox,
  },
  data() {
    return {
      isChecked: false,
      selectedActions: {},
      isMounted: false,
    };
  },
  props: {
    permission: Object,
    rootPermission: Object,
    level: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    
  },
  methods: {
    toggleChildren(value) {
      Object.values(this.permission).forEach((item) => {
      if (item !== value) {
          if (Object.prototype.hasOwnProperty.call(item, 'showChildren')) {
              item.showChildren = false;
          }
      }
    });
      value.showChildren = !value.showChildren;
    },
    handleCheckboxChange(permission, actionKey, key) {
      if (actionKey) {
        permission.action[actionKey] ^= 1;
      } else {
        permission.checked = !permission.checked;
      }

      this.$store.dispatch('findParents', { key }).then(parents => {
          let keys = [].concat(...parents);
          this.updateCheckedStatus(this.$store.state.rootPermissionTitles, keys, actionKey)
      });
    },
    updateCheckedStatus(obj, keys, actionKey) {
      for (let k in obj) {
        if (keys.includes(k)) {
            obj[k].checked = true;
        }

        if (typeof obj[k] === 'object') {
            this.updateCheckedStatus(obj[k], keys, actionKey);
        }
      }
    },
      getLast(object){
      if (typeof object !== 'object'){
        return object;
      }
      for (let key in object){
        return this.getLast(object[key])
      }
    }
  },

});
</script>

<style>
  .grid-item {
    display: flex;
    flex-direction: column;
    width: 11.7rem;
  }
  .permission__button{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  
  .grid-container {
    display: flex;
    flex-direction: row;
    width: max-content;

 

  }

  .selected {
    background-color: #162133;
    color: white;
  }
  .column{
    border-right: 1px solid rgba(222, 226, 231, 1);
    min-height: 500px;
  }
</style>




  