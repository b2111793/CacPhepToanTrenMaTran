// Nạp các hàm cần thiết 
import {NhapMaTran, LuuMaTran, InMaTran, CheoHoaMaTran} from './functions.js';

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
    cols1 = rows1;
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


// CHÉO HÓA MA TRẬN
var ThucHienCheoHoaMaTran = document.getElementById('ThucHienCheoHoaMaTran');
var HienThiMaTranChuyenVi_P = document.getElementById('HienThiMaTranChuyenVi_P');
var HienThiMaTranCheo_D = document.getElementById('HienThiMaTranCheo_D');
var HienThiMaTran_P_NghichDao = document.getElementById('HienThiMaTran_P_NghichDao');
var DaHienThi = false;
ThucHienCheoHoaMaTran.addEventListener('click', function(){
    if(DaHienThi){
        HienThiMaTranChuyenVi_P.innerHTML = "";
        HienThiMaTranCheo_D.innerHTML = "";
        HienThiMaTran_P_NghichDao.innerHTML = "";
        DaHienThi = false;
    }
    else{
        let MaTranDaDuocCheoHoa = CheoHoaMaTran(MaTran1);
        InMaTran(MaTranDaDuocCheoHoa[0], HienThiMaTranChuyenVi_P);
        InMaTran(MaTranDaDuocCheoHoa[1], HienThiMaTranCheo_D);
        InMaTran(MaTranDaDuocCheoHoa[2], HienThiMaTran_P_NghichDao);
        DaHienThi = true;
    }
});





