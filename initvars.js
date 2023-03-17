var userLinks = [];
var domain = 'http://127.0.0.1:3002/';
// var domain = '/';
// Break off point for tablets
// const viewBreakpoint = window.matchMedia("(max-width: 800px), (max-height: 570px)");

// Break off points for new view with 2 elements
const viewBreakpoint = window.matchMedia("(max-width: 890px), (max-height: 570px)");
// const thinTab = window.matchMedia("(max-height: 570px)");
var view = "list";
var authKey = localStorage.getItem('authKey');
// let navbar;
var list;
var editBtns;
var delBtns;
var bb;
var urlBar;
var titleBar;
var addBtn;