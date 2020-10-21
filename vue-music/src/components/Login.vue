<template>
  <div class="Login">
    <div class="Login-box">
      <p><label>手机号</label><input type="text" v-model="name" /></p>
      <p><label>密码</label><input type="paassword" v-model="password" /></p>
      <p><input type="button" value="登录" @click="LoginClick()" /></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    Login() {
      const content = {
        name: this.name,
        password: this.password
      };
      this.$emit("inputChange", this.name, this.password);
    },
    LoginClick() {
      this.$emit("LoginClick");
    }
  },
  watch: {
    name() {
      this.Login();
    },
    password() {
      this.Login();
    }
  }
};
</script>

<style>
.Login {
  width: 100%;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
.Login-box {
  width: 300px;
  height: 150px;
  background-color: white;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.Login-box label {
  display: inline-block;
  width: 50px;
  text-align: right;
  font-size: 16px;
  margin-right: 10px;
}
.Login-box input {
  width: 180px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
  text-indent: 10px;
  outline: none;
}
.Login-box input[type="button"] {
  width: 150px;
  height: 30px;
  border-radius: 30px;
  border: none;
  background-color: red;
  color: white;
}
</style>
