<template>
    <label class="checkbox">
      <input type="checkbox" v-model="checked"  />
      <img v-if="!checked" src="../assets/images/icons/unchecked.svg" alt="Unchecked" />
      <img v-if="checked" src="../assets/images/icons/checked.svg" alt="Checked" />
    </label>
  </template>

  
  <script>
  export default {
    name: 'Checkbox',
    props: {
      value: Boolean,
      rootPermission: Object,
      permission: Object,
      actionKey: String,
      parentKey:String,
    },
    data() {
      return {
        checked: false,
      };
    },
    computed: {

        rootPermissionTitles() {
            return this.$store.state.rootPermissionTitles;
        },
    },
    mounted() {
 
        if (this.actionKey.startsWith('action')) {
            if (this.permission[this.parentKey].action[this.actionKey] === 1) {
                this.checked = true;
            }
        } else {
            this.updateCheckStatus(this.rootPermissionTitles, this.actionKey)
        }
    },
    watch:{
       
        rootPermissionTitles: {
            deep: true,
            handler() {
                this.updateCheckStatus(this.rootPermissionTitles, this.actionKey);
            },
        },
    },
    methods:{
        updateCheckStatus(obj , actionKey){
            for(let k in obj){
                if(k === actionKey) {
                    if(obj[k].checked === true){
                        this.checked = true
                    }
                }else if((typeof obj[k] === 'object')) {
                    this.updateCheckStatus(obj[k], actionKey);
                }
            }

        }
    }

  };
  </script>
  
  <style scoped>
  .checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }
  
  .checkbox input[type='checkbox'] {
    display: none;
  }
  </style>
  