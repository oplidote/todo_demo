<template>

    <ListView :items="todos">
        <template #default="{item, index}">
            <div 
            class="card-body p-2 d-flex"
            @click="moveToPage(item.id)"
            style="cursor:pointer"
            >

            <div class="flex-grow-1">
                <input 
                    type="checkbox" 
                    class="ml-2 mr-2" 
                    :checked="item.complete" 
                    :id="item.id" 
                    @change="toggleTodo(index, $event)"
                    @click.stop
                    
                >
                <span 
                    class="form-check-label" 
                    :class="{ todocss : item.complete }" 
                    >
                    {{ item.subject }}
                </span>
            </div>
            <!-- 삭제버튼 -->
            <div>
                <button 
                    class="btn btn-danger btn-sm" 
                    @click.stop="openModal(item.id)"
                >
                    Delete
                </button>
            </div>
            </div>
        </template>
        
    </ListView>
    <teleport to ="#modal">
        <!-- 경고창 -->
        <DeleteModal
            v-if="showModal"
            @close="closeModal"
            @delete="deleteTodo"
            @close-win = "closeModal"
        >
        </DeleteModal>

    </teleport>
</template>
<script>
    import { useRouter} from 'vue-router' 
    import DeleteModal from '@/components/DeleteModal.vue';
    import {ref} from 'vue';
    import ListView from '@/components/ListView.vue'

    export default {
        components: {
            DeleteModal,
            ListView
        },
        // props: ['todos']
        props: {
            todos: {
                type: Array,
                required: true
            }
        }, 

        emits: ['toggle-todo', 'delete-todo'],

        setup(props, {emit}){

            // 실제 삭제될 id 보관
            const todoDeleteId = ref(null);

            const router = useRouter();
            // 모달 상태
            const showModal = ref(false);
            const openModal = (index) => {
                showModal.value = true;
                todoDeleteId.value = index;
            }
            const closeModal = () => {
                showModal.value =false;
                todoDeleteId.value = null;
            }
            
            const toggleTodo = (index, event) => {
                // console.log(index);
                emit('toggle-todo', index, event.target.checked);
            };
            const deleteTodo = () => {
                emit('delete-todo', todoDeleteId.value);
                showModal.value= false;
                todoDeleteId.value= null;
            };

            // 클릭된 id 를 전달한다.
            const moveToPage = (todoId) => {
                // console.log(todoId);
                // 아이디를 전달한다.
                // router.push('/todos/' + todoId);
                router.push({
                    name: 'Todo',
                    params: {
                        id: todoId
                    }
                });
                
            }

            return {
                toggleTodo,
                deleteTodo,
                moveToPage,
                showModal,
                openModal,
                closeModal,
            }
        }
    }
</script>
<style>

</style>