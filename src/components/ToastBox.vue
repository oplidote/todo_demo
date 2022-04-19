<template>
    <!-- 위치를 잡아준다 -->
    <div class="toast-box">
        <transition-group name="slide">
            <div
            v-for:="item in toasts"
            :key="item.id"
            class="alert"
            :class="`alert-${item.type}`"
            role="alert"
        >
            {{ item.message }}
            </div>
        </transition-group>
    </div>
    

</template>
<script>
    import { useToast } from '@/composables/toast.js'

    export default {
        props: {
            message: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'success'
            }
        },
        setup() {
            const { toasts } = useToast();
            return {
                toasts
            }
        }
    }
</script>
<style>
    .toast-box {
        position: fixed;
        top: 30px;
        right: 10px;
    }
    .slide-enter-active,
    .slide-leave-active {
        transition: all .5s ease;
    }
    .slide-enter-from,
    .slide-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }
    .slide-enter-to,
    .slide-leave-from {
        opacity: 1;
        transform: translateY(0px);
    }
</style>