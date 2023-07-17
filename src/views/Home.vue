<template>
    
    <div class="app-wrapper" style="">
            <side-menu></side-menu>
            <div class="content">
                <Header></Header>
                <div class="app-container">

               
                <BackButton></BackButton>
                <Input></Input>

                <div class="table">
                    <div class="table__header">
                        <div class="table__item" v-for="header in headers" :key="header">{{ header }}</div>
                    </div>
            
                <permission @change="handlePermissionChange" v-if="permission"  :permission="permission.data.rootPermissionTitles" :rootPermission="permission.data.rootPermission"></permission>
                </div>
                <button class="button button-black" @click="createPermission">Сохранить</button>
                </div>
            </div>
    </div>
   
</template>

<script>
    import API from "@/api/api";

    import Permission from '../components/Permission.vue';
    import SideMenu from "../components/SideMenu.vue";
    import Header from '../components/Header.vue';
    import BackButton from '../components/BackButton.vue';
    import Input from '../components/input.vue';

    export default {
        name: 'Home',

        components: {
            Permission,
            SideMenu,
            Header,
            BackButton,
            Input
        },
        data() {
            return {
                permission: null,
                headers: ['Название', 'Проекты', 'Действия']
            }
        },
        methods: {
            getTemplates() {
                API.getTemplates().then(data => {
                    this.permission = data;
                    this.addActions(this.permission?.data.rootPermissionTitles, this.permission?.data.rootPermission)
               

                    this.$store.dispatch('setRootPermissionTitles', this.permission?.data.rootPermissionTitles);
                });
            },
            addActions(titles, permissions)  {
                for (const key in titles) {
                    titles[key].checked = 0;
                    if (key === "items") {
                        this.addActions(titles[key], permissions);
                    } else if (key in permissions) {
                        if ("action" in permissions[key]) {
                            titles[key].action = permissions[key].action;
                        }
                        if ("items" in titles[key]) {
                            this.addActions(titles[key].items, permissions[key]);
                        
                        }
                    }
                }
             
                },
            createPermission() {
                API.createPermission(this.permission.data.rootPermission)
            }
        },
        mounted() {
            this.getTemplates();
           
        }
    }
</script>

<style lang="scss" scoped>
.app-wrapper {
    position: relative;
    overflow: visible;
    display: flex;
    height: 100%;

}
.app-container{
    padding: 0 16px;
    width: 60vw
}
.button{
    margin-top: 21px;
    margin-left: auto;
    display: flex;

}
.button-black{
    background-color: #162133;
    color: #fff;
}
.content{
    width: 100%;
}
.table{
    margin-left: 59px;
    margin-top: 27px;
    box-shadow: 5px 5px 20px rgba(0,0,0,.1);

    overflow-x: auto;
    width: 60vw
}
.table__header{
    display: flex;
    flex-direction: row;
    padding: 16px;
    border-bottom: 1px solid rgba(222, 226, 231, 1);
}
.table__item{
    width: 11.7rem;
}
@media(max-width:800px){
    .app-container,
    .table{
        width: 90vw;
        margin-left: unset;
    }

}

</style>