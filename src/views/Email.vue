<template>
	<div class="form-wrap">
		<el-form ref="form" :rules="rules" :model="form" label-width="100px">
			<el-form-item label="标题" prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="phone">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
			<el-form-item label="电子邮箱" prop="email">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item label="建议或意见" prop="desc">
				<el-input type="textarea" v-model="form.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">提交</el-button>
				<el-button @click="resetForm('form')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { Message } from 'element-ui';
	export default {
		name: 'email',
		data() {
			//验证手机号
			var checkPhone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机号不能为空'));
				} else {
					const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
					//console.log(reg.test(value));
					if (reg.test(value)) {
						callback();
					} else {
						return callback(new Error('请输入正确的手机号'));
					}
				}
			};
      
			//验证邮箱
			var checkEmail = (rule, value, callback) => {
				const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
				if (!value) {
					return callback(new Error('邮箱不能为空'))
				}
				setTimeout(() => {
					if (mailReg.test(value)) {
						callback()
					} else {
						callback(new Error('请输入正确的邮箱格式'))
					}
				}, 100)
			};

			return {
				form: {
					title: '',
					name: '',
					phone: '',
					email: '',
					desc: ''
				},
				rules: {
					title: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 50,
							message: '长度在 2 到 50 个字符',
							trigger: 'blur'
						}
					],
					name: [{
							required: true,
							message: '请输入名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 4,
							message: '长度在 1 到 4 个字符',
							trigger: 'blur'
						}
					],
					phone: [{
						required: true,
						validator: checkPhone,
						trigger: 'blur'
					}],
					email: [{
						required: true,
						validator: checkEmail,
						trigger: 'blur'
					}],
					desc: [{
						required: true,
						message: '建议或意见不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					let obj = {
						"content": this.form.desc,
						"title": this.form.title,
						"senderEmail": this.form.email,
						"senderName": this.form.name,
						"senderPhone": this.form.phone
					}
					
					if (valid) {
						//console.log(this.form)
						//alert('submit!');
						this.$http.getEmail(obj)
						.then(res => {
							if(res.data.resultCode == 0){
								Message.success({
									message: '提交成功',
									offset: 120
								})
								this.resetForm('form')
							}else {
								Message.error({
									message: '提交失败',
									offset: 120
								})
							}
						}).catch(err => {
							console.log(err)
						})
					}else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style lang="scss">
	.form-wrap {
		width: 1100px;
		padding: 50px 100px;
		margin: 0 auto;
		background-color: #f7f7f7;
	}
</style>
