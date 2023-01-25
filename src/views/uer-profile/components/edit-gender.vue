<template>
	<div class="edit-gender">
		<van-picker
			title="选择性别"
			show-toolbar
			:columns="columns"
            :default-index="this.index"
			@confirm="onConfirm"
			@cancel="$emit('close-popup')"
            @change="onChange"
		/>
	</div>
</template>

<script>
	import Vue from "vue";
	import { updataUserProfile } from "@/api/user.js";
	import { Picker } from "vant";

	Vue.use(Picker);
	export default {
		name: "edit_gender",
		data() {
			return {
				columns: ["男", "女"],
                index: this.value
			};
		},
        props: {
            value: {
                type: Number,
                required: true,
                default: 1
            }
        },
        watch: {
            value: {
                handler(val) {
                    this.index = val
                },
                immediate: true
            }
        },
        methods: {
            async onConfirm() {
				this.$toast.loading({
					message: "保存...",
					forbidClick: true,
                    duration: 0
				});
				try {
					await updataUserProfile({ gender: this.index });
					this.$toast.success("保存成功");
                    this.$emit('input', this.index)
                    this.$emit('close-popup')

				} catch (error) {
					this.$toast.fail("更新失败");
				}
			},
            onChange(picker, value, index) {
                this.index = index
            }
        }
	};
</script>

<style>
</style>