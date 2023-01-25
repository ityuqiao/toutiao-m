<template>
	<div class="edit-name">
		<van-nav-bar
			class="page-nav-bar"
			title="设置昵称"
			left-text="取消"
			right-text="完成"
			@click-left="$emit('close-popup')"
			@click-right="onUpdata"
		/>
		<!-- 编辑昵称 -->
		<div class="edit">
			<van-field
				v-model.trim="message"
				rows="2"
				autosize
				type="textarea"
				maxlength="10"
				placeholder="请输入昵称"
				show-word-limit
			/>
		</div>
	</div>
</template>

<script>
	import { updataUserProfile } from "@/api/user.js";
	export default {
		name: "edit_name",
		data() {
			return {
				message: "",
			};
		},
		watch: {
			value: {
				handler(value) {
					this.message = value;
				},
				immediate: true
			},
		},
		props: {
			value: String,
		},
		methods: {
			async onUpdata() {
				const name = this.message;
				if (!name) {
					return this.$toast("请输入昵称");
				}
				this.$toast.loading({
					message: "保存...",
					forbidClick: true,
                    duration: 0
				});
				try {
					await updataUserProfile({ name });
					this.$toast.success("保存成功");
                    this.$emit('close-popup')
				} catch (error) {
					this.$toast.fail("更新失败");
				}
			},
		},
	};
</script>

<style scoped lang="less">
.edit {
	padding: 20px;
}
</style>