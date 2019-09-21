<template>
  <div id="app">
		<Header/>
    <router-view/>
		<Footer/>
  </div>
</template>

<script>
	import Header from '@/components/Header.vue'
	import Footer from '@/components/Footer.vue'
	
	export default {
		components: {
			Header,
			Footer
		}
	}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  color: #333;
  font-size: 16px;  
  line-height: 1.5;
  margin: 0;
  padding: 0;
}
a,img,p,ul,li,input,h1,h2,h3 {
  margin: 0; 
  padding: 0;
}
ul,li { list-style: none;}
input,button,select,textarea {
  outline:none; 
  border:none;
  font-family: "Microsoft YaHei";
}
a {
  text-decoration: none; 
  color: #333; 
  border: none; 
  outline: none;
}
a:focus {
  outline: none;
  }
img {
  border:none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  padding: 0;
}
	
/* float and clear */
.leftfloat {
  float: left;
}
.rightfloat {
  float: right;
}
.cleardiv {
  clear: both;
}
.parent {
  zoom: 1;
}
.parent:after {
  display: block;
  height: 0;
  clear: both;
  content: "";
  visibility: hidden;
}
	
/* Single-line text ellipsis */
.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>