// HÀM NHẬP MA TRẬN 
export function NhapMaTran(rows, cols, HienThiMaTran, MaTran, ChiSoID){
    // Kiểm tra số hàng số cột hợp lệ
    if(isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1){
        alert("Vui lòng nhập số hàng và số cột hợp lệ!");
        return;
    }

    // Tạo bảng HTML và gán cho biến MaTran
    let Html = `<table>`;
    for(let i = 0; i < rows; i++){
        MaTran[i] = [];
        Html += `<tr>`;
        for(let j = 0; j < cols; j++){
            Html += `<td><input type="text" id="${ChiSoID}_${i}_${j}" data-row="${i}" data-col="${j}" class="ONhapLieu"></td>`;
        }
        Html += `</tr>`;
    }
    Html += `</table>`;
    HienThiMaTran.innerHTML = Html; // Hiển thị bảng trong HTML

    // Gắn sự kiện keydown cho tất cả các ô input
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            let ONhapGiaTri = document.getElementById(ChiSoID + "_" + i + "_" + j);
            // Thêm sự kiện keydown cho mỗi ô input
            ONhapGiaTri.addEventListener('keydown', function(event){
                let HangHienTai = parseInt(this.getAttribute('data-row'));
                let CotHienTai = parseInt(this.getAttribute('data-col'));

                switch(event.key){
                    case 'ArrowUp':
                        if(HangHienTai > 0){
                            let DiChuyenLenOBenTren = document.getElementById(ChiSoID + "_" + (HangHienTai - 1) + "_" + CotHienTai);
                            DiChuyenLenOBenTren.focus();  // Di chuyển lên trên
                        }
                        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím
                        break;
                    case 'ArrowDown':
                    case 'Enter':
                        if(HangHienTai < rows - 1){
                            let DiChuyenXuongOBenDuoi = document.getElementById(ChiSoID + "_" + (HangHienTai + 1) + "_" + CotHienTai);
                            DiChuyenXuongOBenDuoi.focus();  // Di chuyển xuống dưới
                        }
                        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím
                        break;
                    case 'ArrowLeft':
                        if(CotHienTai > 0){
                            let DiChuyenSangOBenTrai = document.getElementById(ChiSoID + "_" + HangHienTai + "_" + (CotHienTai - 1));
                            DiChuyenSangOBenTrai.focus();  // Di chuyển sang trái
                        }
                        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím
                        break;
                    case 'ArrowRight':
                        if(CotHienTai < cols - 1){
                            let DiChuyenSangOBenPhai = document.getElementById(ChiSoID + "_" + HangHienTai + "_" + (CotHienTai + 1));
                            DiChuyenSangOBenPhai.focus();  // Di chuyển sang phải
                        }
                        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím
                        break;
                }
            });
        }
    }
}

// HÀM LƯU GIÁ TRỊ MA TRẬN
export function LuuMaTran(rows, cols, MaTran, ChiSoID){
    // Lưu các giá trị vào ma trận
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            let GiaTri = document.getElementById(`${ChiSoID}_${i}_${j}`).value;
            MaTran[i][j] = parseFloat(GiaTri);
        }
    } 
}

// HÀM IN MA TRẬN
export function InMaTran(MaTran, HienThiMaTran){
    let rows = MaTran.length;
    let cols = MaTran[0].length;
    let Html = `<span class="MaTran">`;
    for(let i = 0; i < rows; i++){
        Html += `<span class="Dong">`;
        for(let j = 0; j < cols; j++){
            Html += `<span class="PhanTu">${MaTran[i][j]}</span>`;
        }
        Html += `</span>`;
    }
    Html += `</span>`;
    HienThiMaTran.innerHTML = Html;
}

// HÀM SAO CHÉP GIÁ TRỊ MA TRẬN
export function CopyMaTran(MaTranGoc){
    var MaTran = [];
    let rows = MaTranGoc.length;
    let cols = MaTranGoc[0].length;
    for(let i = 0; i < rows; i++){
        MaTran[i] = [];
        for(let j = 0; j < cols; j++){
            MaTran[i][j] = MaTranGoc[i][j];
        }
    }
    return MaTran;
}

// HÀM TỐI GIẢN GIÁ TRỊ MA TRẬN TRONG CÙNG HÀNG
// Hàm tính ước chung lớn nhất của 2 số
function UCLN(a, b){
    while(b !== 0){
        let temp = b;
        b = a % b;
        a = temp;
    }
    return Math.abs(a);
}

// Hàm tối giản ma trận
function ToiGianMaTran(MaTranGoc){
    let rows = MaTranGoc.length;
    let cols = MaTranGoc[0].length;

    // Mảng lưu trạng thái của các hàng (true nếu toàn bộ là 0)
    var MaTranDanhDau0 = [];
    for(let i = 0; i < rows; i++){
        let Hang0 = true; // Hàng 0
        for(let j = 0; j < cols; j++){
            if(MaTranGoc[i][j] !== 0){
                Hang0 = false;
                break;
            }
        }
        MaTranDanhDau0[i] = Hang0;
    }

    // Tính UCLN cho từng hàng
    var MaTranUCLN = [];
    for(let i = 0; i < rows; i++){
        if(MaTranDanhDau0[i]){
            MaTranUCLN[i] = 1;
        }
        else{
            let ucln = MaTranGoc[i][0];
            for(let j = 1; j < cols; j++){
                ucln = UCLN(ucln, MaTranGoc[i][j]);
            }
            MaTranUCLN[i] = ucln;
        }
    }

    // Tối giản ma trận
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            MaTranGoc[i][j] /= MaTranUCLN[i];
        }
    }

    // Đưa các hàng khác 0 lên trên các hàng 0
    let HangHienTai = 0;
    for(let i = 0; i < rows; i++){
        if(!MaTranDanhDau0[i]){
            if(i !== HangHienTai){
                [MaTranGoc[i], MaTranGoc[HangHienTai]] = [MaTranGoc[HangHienTai], MaTranGoc[i]];
            }
            HangHienTai++;
        }
    }

    // Đưa các phần tử cơ sở về số dương
    for(let i = 0; i < rows; i++){
        // Tìm phần tử cơ sở đầu tiên trong mỗi hàng
        for(let j = 0; j < cols; j++){
            if(MaTranGoc[i][j] !== 0){
                if(MaTranGoc[i][j] < 0){
                    for(let k = 0; k < cols; k++){
                        MaTranGoc[i][k] = -MaTranGoc[i][k];
                    }
                }
                break;
            }
        }
    }
}

// HÀM TÍNH TỔNG
export function CongHaiMaTran(MaTran1, MaTran2){
    if(MaTran1.length === MaTran2.length && MaTran1[0].length === MaTran2[0].length){
        let rows = MaTran1.length;
        let cols = MaTran1[0].length;
        var MaTranTong = [];
        for(let i = 0; i < rows; i++){
            MaTranTong[i] = [];
            for(let j = 0; j < cols; j++){
                MaTranTong[i][j] = MaTran1[i][j] + MaTran2[i][j];
            }
        }
        return MaTranTong;
    }
    else{
        alert("Không thể cộng được do hai ma trận không cùng kích thước!");
        return;
    }
}

// HÀM TÍNH HIỆU
export function TruHaiMaTran(MaTran1, MaTran2){
    if(MaTran1.length === MaTran2.length && MaTran1[0].length === MaTran2[0].length){
        let rows = MaTran1.length;
        let cols = MaTran1[0].length;
        var MaTranHieu = [];
        for(let i = 0; i < rows; i++){
            MaTranHieu[i] = [];
            for(let j = 0; j < cols; j++){
                MaTranHieu[i][j] = MaTran1[i][j] - MaTran2[i][j];
            }
        }
        return MaTranHieu;
    }
    else{
        alert("Không thể trừ được do hai ma trận không cùng kích thước!");
        return;
    }
}

// HÀM NHÂN 1 SỐ VỚI MA TRẬN
export function NhanMotMaTran(MaTran, So){
    let rows = MaTran.length;
    let cols = MaTran[0].length;
    var MaTranMoi = [];
    for(let i = 0; i < rows; i++){
        MaTranMoi[i] = [];
        for(let j = 0; j < cols; j++){
            MaTranMoi[i][j] = MaTran[i][j] * So;
        }
    }
    return MaTranMoi;
}

// HÀM NHÂN 2 MA TRẬN
export function NhanHaiMaTran(MaTran1, MaTran2){
    let cols1 = MaTran1[0].length;
    let rows2 = MaTran2.length;
    if(cols1 !== rows2){
        alert("Không thể nhân được do cấp ma trận 2 không khớp với cấp ma trận 1 (số hàng ma trận B không bằng số cột ma trận A)");
    }
    else{
        let rows1 = MaTran1.length;
        let cols2 = MaTran2[0].length;
        var MaTranTich = [];
        for(let i = 0; i < rows1; i++){
            MaTranTich[i] = [];
            for(let j = 0; j < cols2; j++){
                let TongTamThoi = 0;
                for(let k = 0; k < rows2; k++){
                    TongTamThoi += MaTran1[i][k] * MaTran2[k][j];
                }
                MaTranTich[i][j] = TongTamThoi;
            }
        }
        return MaTranTich;
    }
}

// HÀM CHUYỂN VỊ MA TRẬN
export function ChuyenViMaTran(MaTranGoc){
    let rows = MaTranGoc.length;
    let cols = MaTranGoc[0].length;
    var MaTranChuyenVi = [];
    for(let i = 0; i < cols; i++){
        MaTranChuyenVi[i] = [];
    }
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            MaTranChuyenVi[j][i] = MaTranGoc[i][j]
        }
    }
    return MaTranChuyenVi;
}

// HÀM TÍNH HẠNG CỦA MA TRẬN
export function HangMaTran(MaTranGoc){
    var MaTran = CopyMaTran(MaTranGoc);
    let rank = 0;
    let rows = MaTran.length;
    let cols = MaTran[0].length;

    // Nếu ma trận không vuông, chỉ tính hạng theo số dòng hoặc số cột nhỏ hơn
    let KichThuocNhoHon = (rows < cols) ? rows : cols;

    for(let i = 0; i < KichThuocNhoHon; i++){
        // Nếu phần tử tại vị trí [i, i] bằng 0, tìm dòng khác để hoán vị
        if(MaTran[i][i] === 0){
            let HoanDoi = false;
            for(let j = i + 1; j < rows; j++){
                if(MaTran[j][i] !== 0){
                    [MaTran[i], MaTran[j]] = [MaTran[j], MaTran[i]]; 
                    HoanDoi = true;
                    break;
                }
            }
            if(!HoanDoi){
                continue;
            }
        }

        // Thực hiện phép khử Gauss
        if(MaTran[i][i] !== 0){
            rank++;  
            for(let j = i + 1; j < rows; j++){
                let HeSoNhanDeTrietTieu = MaTran[j][i] / MaTran[i][i];
                for(let k = i; k < cols; k++){
                    MaTran[j][k] -= HeSoNhanDeTrietTieu * MaTran[i][k];
                }
            }
        }
    }

    ToiGianMaTran(MaTran);
    return [rank, MaTran];
}

// HÀM TẠO MA TRẬN ĐƠN VỊ I CẤP n
    function MaTranDonVi(Cap){
        var MaTran = [];
        for(let i = 0; i < Cap; i++){
            MaTran[i] = [];
            for(let j = 0; j < Cap; j++){
                if(i === j){
                    MaTran[i][j] = 1;
                }
                else{
                    MaTran[i][j] = 0;
                }
            }
        }
        return MaTran;
    }

// HÀM TÍNH LŨY THỪA CỦA MA TRẬN VUÔNG CẤP n
export function LuyThuaMaTran(MaTranGoc, BacLuyThua){
    let KichThuocMaTran = MaTranGoc.length;

    if(BacLuyThua === 0){ 
       return MaTranDonVi(KichThuocMaTran);
    }
    else if(BacLuyThua === 1){
        return MaTranGoc;
    }
    else{
        var MaTranKetQua = CopyMaTran(MaTranGoc)
        for(let i = 1; i < BacLuyThua; i++){
            MaTranKetQua = NhanHaiMaTran(MaTranKetQua, MaTranGoc);
        }
    }

    return MaTranKetQua;
}

// HÀM TÍNH ĐỊNH THỨC CỦA MA TRẬN VUÔNG CẤP n
export function DinhThucMaTran(MaTranGoc){
    let KichThuocMaTran = MaTranGoc.length;
    // Trường hợp cơ bản ma trận 1x1
    if(KichThuocMaTran === 1){
        return MaTranGoc[0][0];
    }

    // Trường hợp cơ bản ma trận 2x2
    if(KichThuocMaTran === 2){
        return MaTranGoc[0][0] * MaTranGoc[1][1] - MaTranGoc[0][1] * MaTranGoc[1][0];
    }

    // Các trường hợp ma trận 3x3, 4x4, 5x5, ... , nxn
    let GiaTriDinhThucCuaMaTran = 0;
    for(let CotCuaMaTran = 0; CotCuaMaTran < KichThuocMaTran; CotCuaMaTran++){
        // Ma trận loại bỏ hàng đầu và cột hiện tại
        let MaTranCon = [];
        for(let i = 1; i < KichThuocMaTran; i++){
            let HangMoi = []; // Hàng mới
            for(let j = 0; j < KichThuocMaTran; j++){
                if(j !== CotCuaMaTran){
                    HangMoi.push(MaTranGoc[i][j]);
                }
            }
            MaTranCon.push(HangMoi);
        }
        // Tính định thức của ma trận con và cộng vào kết quả
        let DauCuaPhanTu = (CotCuaMaTran % 2 === 0) ? 1 : -1;
        GiaTriDinhThucCuaMaTran += DauCuaPhanTu * MaTranGoc[0][CotCuaMaTran] * DinhThucMaTran(MaTranCon);
    }
    return GiaTriDinhThucCuaMaTran;
}

// HÀM TÌM NGHỊCH ĐẢO CỦA MỘT MA TRẬN VUÔNG CẤP n
export function NghichDaoMaTran(MaTranGoc){
    // Tính định thức của ma trận, ma trận khả nghịch khi định thức khác 0
    if(DinhThucMaTran(MaTranGoc) === 0){
        alert("Ma trận không khả nghịch!");
    }
    else{
        let KichThuocMaTran = MaTranGoc.length;
        
        // Tạo ma trận mở rộng từ ma trận gốc và ma trận đơn vị I cấp tương ứng
        var MaTranMoRong = [];
        for(let i = 0; i < KichThuocMaTran; i++){
            MaTranMoRong[i] = [];
            // Tạo một nữa bên trái là ma trận gốc
            for(let j = 0; j < KichThuocMaTran; j++){
                MaTranMoRong[i][j] = MaTranGoc[i][j];
            }

            // Tạo một nữa bên phải là ma trận đơn vị cấp tương ứng
            for(let j = 0; j < KichThuocMaTran; j++){
                MaTranMoRong[i][j + KichThuocMaTran] = (i === j) ? 1 : 0;
            }
        }

        // Áp dụng phương pháp Gauss-Jordan
        for(let i = 0; i < KichThuocMaTran; i++){
            // Chia hàng để tạo giá trị 1 tại vị trí [i][i]
            let BienTamDuaVeGiaTri1 = MaTranMoRong[i][i];
            for(let j = 0; j < 2 * KichThuocMaTran; j++){
                MaTranMoRong[i][j] /= BienTamDuaVeGiaTri1;
            }

            // Khử các phần tử khác trong cột i
            for(let k = 0; k < KichThuocMaTran; k++){
                if(k !== i){
                    let BienKhuGiaTriTaiCoti = MaTranMoRong[k][i];
                    for(let j = 0; j < 2 * KichThuocMaTran; j++){
                        MaTranMoRong[k][j] -= BienKhuGiaTriTaiCoti * MaTranMoRong[i][j];
                    }
                }
            }
        }

        // Trích xuất ma trận nghịch đảo từ một nữa bên phải của ma trận mở rộng
        var MaTranNghichDao = [];
        for(let i = 0; i < KichThuocMaTran; i++){
            MaTranNghichDao[i] = MaTranMoRong[i].slice(KichThuocMaTran, 2 * KichThuocMaTran);
        }
        return MaTranNghichDao;
    }
}

// Chéo hóa ma trận 2x2
// Tìm giá trị riêng
function GiaTriRieng2(MaTran){
    let GiaTriDuongCheoChinh = MaTran[0][0] + MaTran[1][1];
    let GiaTriDinhThuc = DinhThucMaTran(MaTran);
    let Lamda1 = (GiaTriDuongCheoChinh + Math.sqrt((GiaTriDuongCheoChinh**2) - 4*GiaTriDinhThuc)) / 2;
    let Lamda2 = (GiaTriDuongCheoChinh - Math.sqrt((GiaTriDuongCheoChinh**2) - 4*GiaTriDinhThuc)) / 2;

    if(Lamda1 > Lamda2){
        [Lamda1, Lamda2] = [Lamda2, Lamda1];
    }

    return [Lamda1, Lamda2];
}

// Tìm vector riêng
function VectoRieng2(MaTran, GiaTriRieng){
    // Ma trận - Lamda*In: A
    let A = [
        [MaTran[0][0] - GiaTriRieng, MaTran[0][1]],
        [MaTran[1][0], MaTran[1][1] - GiaTriRieng]
    ];

    if(A[0][0] !== 0){
        return [-A[0][1] / A[0][0], 1];
    }
    else{
        alert("Không tìm được vector riêng trong trường hợp này! Ma trận không thể chéo hóa được!");
    }
}

// Chéo hóa ma trận
export function CheoHoaMaTran2(MaTranGoc){
    let GiaTriRieng = GiaTriRieng2(MaTranGoc);

    let VectorRieng = [
        VectoRieng2(MaTranGoc, GiaTriRieng[0]),
        VectoRieng2(MaTranGoc, GiaTriRieng[1])
    ];

    // Tạo ma trận chuyển vị P từ các vector riêng
    var P = [
        [VectorRieng[0][0], VectorRieng[1][0]],
        [VectorRieng[0][1], VectorRieng[1][1]]
    ];

    // Tạo ma trận chéo D
    var D =[
        [GiaTriRieng[0], 0],
        [0, GiaTriRieng[1]]
    ];

    // Tạo ma trận nghịch đảo P^(-1)
    if(DinhThucMaTran(P) === 0){
        alert("Ma trận không thể chéo hóa được!");
        return;
    }
    else{
        var P_NghichDao = NghichDaoMaTran(P);
    }

    return [P, D, P_NghichDao];
}

// Chéo hóa ma trận 3x3
// Giải phương trình bậc 3 bằng phương pháp lượng giác
function GiaiPhuongTrinhBac3(a, b, c, d){
    // Chuyển phương trình về dạng x^3 + px + q = 0
    let p = (3*a*c - b**2) / (3*a**2);
    let q = (2*b**3 - 9*a*b*c + 27*a**2*d) / (27*a**3);

    // Tính Delta
    let Delta = (q/2)**2 + (p/3)**3;
    let x, x1, x2, x3;

    if(Delta < 0){
        // Trường hợp có 3 nghiệm thực
        let r = 2*Math.sqrt(-p/3);
        let Theta = Math.acos((3*q) / (2*p) * Math.sqrt(-3/p));
        
        x1 = r*Math.cos(Theta/3) - b/(3*a);
        x2 = r*Math.cos(Theta/3 + (2*Math.PI/3)) - b/(3*a);
        x3 = r*Math.cos(Theta/3 - (2*Math.PI/3)) - b/(3*a);
        
        return [x1, x2, x3];
    }else if (Delta === 0) {
        // Trường hợp có nghiệm bội (nghiệm kép hoặc ba nghiệm trùng)
    
        // (p === 0 và q === 0) -> Phương trình có nghiệm bội 3
        if(p === 0 && q === 0){
            x = -b/(3*a);
            return [x, x, x];
        }
        

        // (p !== 0) -> Phương trình có nghiệm kép và nghiệm đơn
        if(p !== 0){
            x1 = -2*q/p - b/(3*a); // Nghiệm kép x1 = x2
            x2 = x1;
            x3 = q/p - b/(3*a); // Nghiệm đơn
            return [x1, x2, x3];
        }
    }else{ //Delta > 0
        alert("Có nghiệm phức!")
        // Trường hợp có một nghiệm thực và 2 nghiệm phức
        // let u = Math.cbrt(-q/2 + Math.sqrt(Delta));
        // let v = Math.cbrt(-q/2 - Math.sqrt(Delta));
        // x = (u+v - b/(3*a));
        // return [x, null, null];
    }
}

// Tìm giá trị riêng
function GiaTriRieng3(MaTran){
    let GiaTriDuongCheoChinh = MaTran[0][0] + MaTran[1][1] + MaTran[2][2];
    let GiaTriDinhThuc = DinhThucMaTran(MaTran);
    
    // Hệ số phương trình bậc 3 ax^3 + bx^2 + cx + d = 0
    let a, b, c, d, c_mot, c_hai;
    a = 1;
    b = -GiaTriDuongCheoChinh;
    c_mot = MaTran[0][0]*MaTran[1][1] + MaTran[0][0]*MaTran[2][2] + MaTran[1][1]*MaTran[2][2];
    c_hai = MaTran[0][2]*MaTran[2][0] + MaTran[2][1]*MaTran[1][2] + MaTran[0][1]*MaTran[1][0];
    c = c_mot - c_hai;
    d = -GiaTriDinhThuc;

    let Lamda = [];
    Lamda = GiaiPhuongTrinhBac3(a, b, c, d);

    let Lamda_len = Lamda.length;
    for(let i = 0; i < Lamda_len - 1; i++){
        for(let j = 0; j < Lamda_len - 1 - i ; j++){
            if(Lamda[j] > Lamda[j+1]){
                [Lamda[j], Lamda[j+1]] = [Lamda[j+1], Lamda[j]];
            }
        }
    }

    return Lamda;
}

// Tìm vector riêng
function VectoRieng3(MaTran, GiaTriRieng){
    // Tạo ma trận A - lambda * I
    let A = [
        [MaTran[0][0] - GiaTriRieng, MaTran[0][1], MaTran[0][2]],
        [MaTran[1][0], MaTran[1][1] - GiaTriRieng, MaTran[1][2]],
        [MaTran[2][0], MaTran[2][1], MaTran[2][2] - GiaTriRieng]
    ];

    // Khởi tạo vector riêng tạm thời với các giá trị chưa biết
    let vector = [0, 0, 0];

    // Biến đổi hàng để đưa ma trận về dạng tam giác trên
    for(let i = 0; i < 3; i++){
        if(A[i][i] === 0){
            // Tìm một hàng không có phần tử 0 ở vị trí A[i][i] để hoán vị
            for(let j = i + 1; j < 3; j++){
                if(A[j][i] !== 0){
                    [A[i], A[j]] = [A[j], A[i]];
                    break;
                }
            }
        }

        // Biến đổi để các phần tử dưới A[i][i] bằng 0
        for(let j = i + 1; j < 3; j++){
            if(A[j][i] !== 0){
                let HeSoNhanDeTrietTieu = A[j][i] / A[i][i];
                for(let k = i; k < 3; k++){
                    A[j][k] -= HeSoNhanDeTrietTieu * A[i][k];
                }
            }
        }
    }

    // Giải hệ phương trình theo vector riêng bằng phương pháp thế ngược
    if(A[2][2] !== 0){
        vector[2] = 1; // Giả định v3 = 1 để tính toán
        vector[1] = -A[1][2] * vector[2] / A[1][1];
        vector[0] = -(A[0][1] * vector[1] + A[0][2] * vector[2]) / A[0][0];
    }else if (A[1][1] !== 0){
        vector[2] = 0;
        vector[1] = 1;
        vector[0] = -A[0][1] * vector[1] / A[0][0];
    }else if (A[0][0] !== 0){
        vector[2] = 0;
        vector[1] = 0;
        vector[0] = 1;
    }

    return vector;
}

// Chéo hóa ma trận
export function CheoHoaMaTran3(MaTranGoc){
    let GiaTriRieng = GiaTriRieng3(MaTranGoc);

    let VectorRieng = [
        VectoRieng3(MaTranGoc, GiaTriRieng[0]),
        VectoRieng3(MaTranGoc, GiaTriRieng[1]),
        VectoRieng3(MaTranGoc, GiaTriRieng[2])
    ];

    // Tạo ma trận chuyển vị P từ các vector riêng
    var P = [
        [VectorRieng[0][0], VectorRieng[1][0], VectorRieng[2][0]],
        [VectorRieng[0][1], VectorRieng[1][1], VectorRieng[2][1]],
        [VectorRieng[0][2], VectorRieng[1][2], VectorRieng[2][2]]
    ];

    // Tạo ma trận chéo D
    var D =[
        [GiaTriRieng[0], 0, 0],
        [0, GiaTriRieng[1], 0],
        [0, 0, GiaTriRieng[2]]
    ];

    // Tạo ma trận nghịch đảo P^(-1)
    if(DinhThucMaTran(P) === 0){
        alert("Ma trận không thể chéo hóa được!");
        return;
    }
    else{
        var P_NghichDao = NghichDaoMaTran(P);
    }

    return [P, D, P_NghichDao];
}

// HÀM CHÉO HÓA MA TRẬN
export function CheoHoaMaTran(MaTranGoc){
    let KichThuocMaTran = MaTranGoc.length;
    var KetQuaTraVe = null;
    if(KichThuocMaTran === 2){
        KetQuaTraVe = CheoHoaMaTran2(MaTranGoc);
    }
    else if(KichThuocMaTran === 3){
        KetQuaTraVe = CheoHoaMaTran3(MaTranGoc);
    }
    else{
        alert("Hiện tại chương trình chưa xử lý được ma trận có kích thước này!");
    }

    return KetQuaTraVe;
}