<template>
	<div class="edit-birthday">
		<van-datetime-picker
			v-model="currentDate"
			type="date"
			:min-date="minDate"
			:max-date="maxDate"
			@cancel="$emit('close-popup')"
			@confirm="onConfirm"
		/>
	</div>
</template>

<script>
	import Vue from "vue";
	import { DatetimePicker } from "vant";
	import { updataUserProfile } from "@/api/user.js";
    import dayjs from "dayjs";

	Vue.use(DatetimePicker);
	export default {
		name: "edit_birthday",
		data() {
			return {
				minDate: new Date(1950, 0, 1),
				maxDate: new Date(),
				currentDate: new Date(this.value),
			};
		},
		props: {
			value: {
				type: String,
				required: true,
			},
		},
		methods: {
			async onConfirm() {
				this.$toast.loading({
					message: "保存...",
					forbidClick: true,
					duration: 0,
				});
                const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
				try {
					await updataUserProfile({ birthday  });
					this.$toast.success("保存成功");
					this.$emit("input", birthday);
					this.$emit("close-popup");
				} catch (error) {
					this.$toast.fail("更新失败");
				}
			},
		},
	};
</script>

<style>
</style>