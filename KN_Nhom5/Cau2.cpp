#include <iostream>
#include <vector>
#include <algorithm>
#include "CD.h"
#include"CaSi.h"
bool maCDDaTonTai(const std::vector<CD>& dsCDs, const std::string& maCD) {
    for (const auto& cd : dsCDs) {
        if (cd.getMaCD() == maCD) {
            return true;
        }
    }
    return false;
}

void tinhSoCDTheoCaSi(const std::vector<CD>& dsCDs) {
    std::unordered_map<std::string, int> soCDTheoCaSi;
    for (const auto& cd : dsCDs) {
        std::string maCaSi = cd.getCaSi().getMaCaSi();
        soCDTheoCaSi[maCaSi]++;
    }

    for (const auto& entry : soCDTheoCaSi) {
        std::cout << "Ca si ma " << entry.first << ": " << entry.second << " CD(s)" << std::endl;
    }
}

void tinhGiaTrungBinhTheoCaSi(const std::vector<CD>& dsCDs) {
    std::unordered_map<std::string, std::pair<double, int>> tongGiaVaSoCD;

    for (const auto& cd : dsCDs) {
        std::string maCaSi = cd.getCaSi().getMaCaSi();
        tongGiaVaSoCD[maCaSi].first += cd.getGiaThanh();
        tongGiaVaSoCD[maCaSi].second++;
    }

    std::cout << "\nGia thanh trung binh cua CD theo ca si:\n";
    for (const auto& entry : tongGiaVaSoCD) {
        double giaTrungBinh = entry.second.first / entry.second.second;
        std::cout << "Ca si ma " << entry.first << ": Gia thanh trung binh = " << giaTrungBinh << std::endl;
    }
}

bool kiemTraCaSiDaPhatHanhCD(const std::vector<CD>& dsCDs, const std::string& maCaSi) {
    for (const auto& cd : dsCDs) {
        if (cd.getCaSi().getMaCaSi() == maCaSi) {
            return true;
        }
    }
    return false;
}

void sapXepGiamDanTheoGiaThanh(std::vector<CD>& dsCDs) {
    std::sort(dsCDs.begin(), dsCDs.end(), [](const CD& a, const CD& b) {
        return a.getGiaThanh() > b.getGiaThanh();
    });
}

void sapXepTangDanTheoTuaCD(std::vector<CD>& dsCDs) {
    std::sort(dsCDs.begin(), dsCDs.end(), [](const CD& a, const CD& b) {
        return a.getTuaCD() < b.getTuaCD();
    });
}

void xuatDanhSachTheoCaSi(const std::vector<CD>& dsCDs) {
    std::unordered_map<std::string, std::vector<CD>> cdsTheoCaSi;

    for (const auto& cd : dsCDs) {
        std::string maCaSi = cd.getCaSi().getMaCaSi();
        cdsTheoCaSi[maCaSi].push_back(cd);
    }

    for (const auto& entry : cdsTheoCaSi) {
        std::cout << "\nDanh sach CD cua ca si ma " << entry.first << ":\n";
        for (const auto& cd : entry.second) {
            cd.xuat();
            std::cout << "-----------------------------------\n";
        }
    }
}

void menu() {
    std::vector<CD> dsCDs;
    int chon;
    do {
        std::cout << "\nMENU QUAN LY ALBUM CD\n";
        std::cout << "1. Them CD\n";
        std::cout << "2. Tinh so CD theo ca si\n";
        std::cout << "3. Tinh gia thanh trung binh theo ca si\n";
        std::cout << "4. Kiem tra ca si da phat hanh CD\n";
        std::cout << "5. Sap xep danh sach CD giam dan theo gia thanh\n";
        std::cout << "6. Sap xep danh sach CD tang dan theo tua CD\n";
        std::cout << "7. Xuat danh sach CD theo ca si\n";
        std::cout << "0. Thoat\n";
        std::cout << "Chon: ";
        std::cin >> chon;
        std::cin.ignore();  

        switch (chon) {
            case 1: {
                CD cd;
                cd.nhap();
                if (!maCDDaTonTai(dsCDs, cd.getMaCD())) {
                    dsCDs.push_back(cd);
                    std::cout << "Them CD thanh cong.\n";
                } else {
                    std::cout << "Ma CD da ton tai.\n";
                }
                break;
            }
            case 2:
                tinhSoCDTheoCaSi(dsCDs);
                break;
            case 3:
                tinhGiaTrungBinhTheoCaSi(dsCDs);
                break;
            case 4: {
                std::string maCaSi;
                std::cout << "Nhap ma ca si: ";
                std::getline(std::cin, maCaSi);
                if (kiemTraCaSiDaPhatHanhCD(dsCDs, maCaSi)) {
                    std::cout << "Ca si da phat hanh CD.\n";
                } else {
                    std::cout << "Ca si chua phat hanh CD.\n";
                }
                break;
            }
            case 5:
                sapXepGiamDanTheoGiaThanh(dsCDs);
                std::cout << "Danh sach CD da duoc sap xep giam dan theo gia thanh.\n";
                break;
            case 6:
                sapXepTangDanTheoTuaCD(dsCDs);
                std::cout << "Danh sach CD da duoc sap xep tang dan theo tua CD.\n";
                break;
            case 7:
                xuatDanhSachTheoCaSi(dsCDs);
                break;
            case 0:
                std::cout << "Thoat chuong trinh.\n";
                break;
            default:
                std::cout << "Lua chon khong hop le. Vui long chon lai.\n";
                break;
        }
    } while (chon != 0);
}

int main() {
    menu();
    return 0;
}
