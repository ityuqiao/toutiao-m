<template>
	<div class="user-frofile">
		<!-- 导航栏 -->
		<van-nav-bar
			class="page-nav-bar"
			title="个人信息"
			left-text="返回"
			left-arrow
			@click-left="$router.back()"
		/>
		<!-- 内容 -->
		<van-cell-group>
			<van-cell title="头像" is-link @click="$refs.file.click()">
				<van-image class="image" round fit="cover" :src="userProfile.photo" />
			</van-cell>
			<van-cell
				title="昵称"
				:value="userProfile.name"
				is-link
				@click="isUpdataNameShow = true"
			/>
			<van-cell
				title="性别"
				:value="userProfile.gender ? '女' : '男'"
				is-link
				@click="isUpdataGenderShow = true"
			/>
			<van-cell
				title="生日"
				:value="userProfile.birthday"
				is-link
				@click="isUpdataBirthdayShow = true"
			/>
		</van-cell-group>
		<input type="file" hidden ref="file" @change="onFileChange" />
		<!-- 编辑用户昵称弹出层 -->
		<van-popup
			v-model="isUpdataNameShow"
			position="bottom"
			:style="{ height: '100%' }"
		>
			<editName
				@close-popup="isUpdataNameShow = false"
				v-model="userProfile.name"
				v-if="isUpdataNameShow"
			></editName>
		</van-popup>
		<!-- 编辑用户性别弹出层 -->
		<van-popup v-model="isUpdataGenderShow" position="bottom">
			<editGender
				@close-popup="isUpdataGenderShow = false"
				v-model="userProfile.gender"
				v-if="isUpdataGenderShow"
			></editGender>
		</van-popup>
		<!-- 编辑用户生日弹出层 -->
		<van-popup v-model="isUpdataBirthdayShow" position="bottom">
			<editBirthday
				v-if="isUpdataBirthdayShow"
				v-model="userProfile.birthday"
				@close-popup="isUpdataBirthdayShow = false"
			></editBirthday>
		</van-popup>
		<!-- 编辑用户头像弹出层 -->
		<van-popup
			v-model="isUpdataPhotoShow"
			position="bottom"
			:style="{ height: '100%' }"
		>
			<editPhoto
				:photo="photo"
				@close-popup="isUpdataPhotoShow = false"
				@updataPhoto="userProfile.photo = $event"
				v-if="isUpdataPhotoShow"
			></editPhoto>
		</van-popup>
	</div>
</template>

<script>
	import { getUserProfile } from "@/api/user.js";
	import editName from "./components/edit-name.vue";
	import editGender from "./components/edit-gender.vue";
	import editBirthday from "./components/edit-birthday.vue";
	import editPhoto from "./components/edit-photo.vue";
	export default {
		name: "user_profile",
		data() {
			return {
				userProfile: {},
				isUpdataNameShow: false,
				isUpdataGenderShow: false,
				isUpdataBirthdayShow: false,
				isUpdataPhotoShow: false,
				photo: null,
			};
		},
		components: {
			editName,
			editGender,
			editBirthday,
			editPhoto,
		},
		created() {
			this.loadUserProfile();
		},
		methods: {
			async loadUserProfile() {
				try {
					const { data } = await getUserProfile();
					// console.log(data)
					this.userProfile = data.data;
				} catch (error) {
					this.$toast("获取用户个人资料失败");
				}
			},
			onFileChange() {
				const file = this.$refs.file.files[0];
				this.photo = window.URL.createObjectURL(file);
				this.isUpdataPhotoShow = true;
				this.$refs.file.value = "";
			},
		},
	};
</script>

<style scoped lang="less">
.user-frofile {
	/deep/ .van-icon-arrow-left {
		color: #fff;
	}
	.image {
		width: 60px;
		height: 60px;
	}
	.van-popup {
		background-color: #f5f7f9;
	}
}
</style>