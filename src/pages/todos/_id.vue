<template>    
    <h1>TODO 수정</h1>

    <div v-if="loading">Loading...</div>

    <form v-else @submit.prevent="onSave">

        <div class="row">
            
            <!-- 제목 수정 창 -->
            <div class="col-6">

                <div class="form-group">
                    <label>제목</label>
                    <input type="text" class="form-control" v-model="todo.subject">
                </div>

            </div>

            <!-- 상태 수정 창 -->
            <div class="col-6">
                
                <div class="form-group">                    
                    <label>완료여부</label>   
                    <div>
                        <button 
                            class="btn"
                            :class="todo.complete ? 'btn-success' : 'btn-danger' "
                            @click="toggleTodoState"
                            type="button"
                        >
                            {{ todo.complete ? 'Complete' : 'Incomplete' }}

                        </button>
                    </div>
                </div>
            </div>
        </div>        

        <button 
            class="btn btn-primary" 
            type="submit"
            v-bind:disabled="todoUpdate"
        >
            저장
        </button>        
        <button class="btn btn-outline-dark ml-2" @click="moveBack" type="button">취소</button>

    </form>

    <ToastBox v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
import {computed, ref} from 'vue';
import _ from 'lodash';

import ToastBox from '@/components/ToastBox.vue'

export default {
    components: {
        ToastBox
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo =  ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);
        const todoId = route.params.id;

        // toastBox 관련
        const showToast = ref(false); // 보이고 안보이고
        const toastMessage = ref(''); // 메시지
        const toastAlertType = ref('');
        // 메시지가 전달되면 toastBox 보여주기
        const triggerToast = (message = '', type = 'success') => {
            toastMessage.value = message;
            showToast.value = true;
            toastAlertType.value = type;

            setTimeout(() => {
                toastMessage.value = '';
                showToast.value = false;
            }, 3000);
        }

        const getTodo = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);            
                todo.value = {...res.data }; // spread 연산으로 내용물 만 복사
                originalTodo.value = { ...res.data }; // spread 연산으로 내용물 만 복사
                loading.value = false;
            }catch(error){
                console.log(error);
                triggerToast('서버에서 자료를 불러오는 데 실패하였습니다.', 'danger');
            }
        }   

        const todoUpdate = computed(() => {
            return _.isEqual(todo.value, originalTodo.value);
        });

        getTodo();

        const toggleTodoState = () => {
            todo.value.complete = !todo.value.complete
        }

        const moveBack = () => {            
            router.push({
                name: 'Todos'
            });
        }

        const onSave = async () => {
            
            try {
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                    subject: todo.value.subject,
                    complete: todo.value.complete
                });
                // console.log(res);
                originalTodo.value = { ...res.data };

                triggerToast('데이터 저장에 성공하였습니다.', 'success');
            }catch(error){
                console.log(error);
                triggerToast('데이터 저장에 실패하였습니다.', 'danger');
            }
        };

        return {
            todo,
            loading,
            toggleTodoState,
            moveBack,
            onSave,
            todoUpdate,

            showToast,
            toastMessage,
            toastAlertType,
        }

    }
}
</script>

<style>
</style>