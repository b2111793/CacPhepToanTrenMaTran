// Nạp các hàm cần thiết 
import {NhapMaTran, LuuMaTran, InMaTran, NhanHaiMaTran} from './functions.js';

// Khai báo ma trận 1
var MaTran1 = [];
var rows1, cols1;
var ChiSoID1 = 1;
var DanhDauDaLuu1 = false;
var HienThiMaTran1 = document.getElementById('HienThiMaTran1');
var NhapMaTran1 = document.getElementById('NhapMaTran1');

// Sử dụng addEventListener với hàm đã được định nghĩa để nhập ma trận 1
NhapMaTran1.addEventListener('click', function(){
    MaTran1 = [];
    rows1 = parseInt(document.getElementById('rows1').value);
    cols1 = parseInt(document.getElementById('cols1').value);
    NhapMaTran(rows1, cols1, HienThiMaTran1, MaTran1, ChiSoID1);
});

// Lưu các giá trị vào ma trận 1
var LuuMaTran1 = document.getElementById('LuuMaTran1');
LuuMaTran1.addEventListener('click', function(){
    LuuMaTran(rows1, cols1, MaTran1, ChiSoID1);
    DanhDauDaLuu1 = true;
    alert("Đã lưu thành công!");
});

// In các giá trị ma trận 1
var InMaTran1 = document.getElementById('InMaTran1');
var HienThiMaTranKetQua1 = document.getElementById('HienThiMaTranKetQua1');
InMaTran1.addEventListener('click', function(){
    if(!DanhDauDaLuu1){
        alert("Chưa thể in được, do chưa bấm nút lưu ma trận!");
    }
    else{
        InMaTran(MaTran1, HienThiMaTranKetQua1);
    }
});

// Khai báo ma trận 2
var MaTran2 = [];
var rows2, cols2;
var ChiSoID2 = 2;
var DanhDauDaLuu2 = false;
var HienThiMaTran2 = document.getElementById('HienThiMaTran2');
var NhapMaTran2 = document.getElementById('NhapMaTran2');

// Sử dụng addEventListener với hàm đã được định nghĩa để nhập ma trận 2
NhapMaTran2.addEventListener('click', function(){
    MaTran2 = [];
    rows2 = parseInt(document.getElementById('rows2').value);
    cols2 = parseInt(document.getElementById('cols2').value);
    NhapMaTran(rows2, cols2, HienThiMaTran2, MaTran2, ChiSoID2);
});

// Lưu các giá trị vào ma trận 2
var LuuMaTran2 = document.getElementById('LuuMaTran2');
LuuMaTran2.addEventListener('click', function(){
    LuuMaTran(rows2, cols2, MaTran2, ChiSoID2);
    DanhDauDaLuu2 = true;
    alert("Đã lưu thành công!");
});

// In các giá trị ma trận 2
var InMaTran2 = document.getElementById('InMaTran2');
var HienThiMaTranKetQua2 = document.getElementById('HienThiMaTranKetQua2');
InMaTran2.addEventListener('click', function(){
    if(!DanhDauDaLuu2){
        alert("Chưa thể in được, do chưa bấm nút lưu ma trận!");
    }
    else{
        InMaTran(MaTran2, HienThiMaTranKetQua2);
    }
});


// TÍNH TÍCH 2 MA TRẬN
var Nhan = document.getElementById('Nhan');
var HienThiTich = document.getElementById('HienThiTich');

Nhan.addEventListener('click', function(){
    if(cols1 === rows2){
        InMaTran(NhanHaiMaTran(MaTran1, MaTran2), HienThiTich);
    }
    else{
        NhanHaiMaTran(MaTran1, MaTran2);
        HienThiTich.innerHTML = "";
    }
});





