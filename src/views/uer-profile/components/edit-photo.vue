<template>
	<div class="edit-photo">
		<img :src="photo" alt="" class="photo" ref="img" />
		<div class="isEdit">
			<div @click="$emit('close-popup')">取消</div>
			<div @click="onComfirm">完成</div>
		</div>
	</div>
</template>

<script>
	import "cropperjs/dist/cropper.css";
	import Cropper from "cropperjs";
	import { updataUserPhoto } from "@/api/user.js";

	export default {
		name: "edit_photo",
		props: {
			photo: {
				type: [String, Object],
				required: true,
			},
		},
		data() {
			return {
				cropper: null,
			};
		},
		mounted() {
			const image = this.$refs.img;
			this.cropper = new Cropper(image, {
				viewMode: 1,
				dragMode: "move",
				aspectRatio: 1,
				autoCropArea: 1,
				cropBoxMovable: false,
				// cropBoxResizable: false,
				background: false,
				movable: true,
			});
		},
		methods: {
			onComfirm() {
				this.cropper.getCroppedCanvas().toBlob(async (blob) => {
					this.$toast.loading({
						message: "保存...",
						forbidClick: true,
						duration: 0,
					});
					try {
						const formData = new FormData();
						formData.append("photo", blob /*, 'example.png' */);
						const { data } = await updataUserPhoto(formData);
						this.$toast.success("更新成功");
						this.$emit("close-popup");
						this.$emit("updataPhoto", data.data.photo);
					} catch (error) {
						this.$toast.fail("更新失败");
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
.edit-photo {
	background-color: #000;
	height: 100%;
	.photo {
		display: block;
		max-width: 100%;
	}
	.isEdit {
		position: fixed;
		bottom: 0;
		justify-content: space-between;
		width: 100%;
		display: flex;
		div {
			width: 90px;
			height: 90px;
			text-align: center;
			line-height: 90px;
			font-size: 30px;
			color: #fff;
		}
	}
}
</style>