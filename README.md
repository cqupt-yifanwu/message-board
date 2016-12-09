# message-board
利用react+express+mongodb+webpack搭建的留言板 （需要npm install所有依赖）
	<p>利用react构建前端的组件，后台使用Express4.X（并且定义增删改查的接口供前端ajax调用，所涉及数据均操作于mongodb（可以使用可视化工具Robomongodb来观察数据的改变）;</p>
	<p>此demo完整模拟了前端（react）到后台（express+mongodb）的数据交互，并且使用webpack搭建此应用（配置文件和依赖文件可供日后使用，方便秒键项目脚手架）;</p>
	<span>tip</span>
	<ul>
		<li>在这个demo中采用轮询的方式来监听数据的改变</li>
		<li>运行demo时需要install所有的依赖</li>
		<li>使用了es6语法（需要注意作用域问题，this的绑定）</li>
	</ul>