#include "CaSi.h"

CaSi::CaSi() : maCaSi(""), hoTen(""), tuoi(0), ngheDanh(""), dongNhac(""), thapNien() {}

CaSi::CaSi(const std::string& ma, const std::string& hoTen, int tuoi,
           const std::string& ngheDanh, const std::string& dongNhac, 
           const std::vector<int>& thapNien)
    : maCaSi(ma), hoTen(hoTen), tuoi(tuoi), ngheDanh(ngheDanh), dongNhac(dongNhac), thapNien(thapNien) {}

void CaSi::nhap() {
    std::cout << "Nhap ma ca si: ";
    std::getline(std::cin, maCaSi);
    
    std::cout << "Nhap ho ten: ";
    std::getline(std::cin, hoTen);
    
    std::cout << "Nhap tuoi: ";
    std::cin >> tuoi;
    std::cin.ignore();

    std::cout << "Nhap nghe danh: ";
    std::getline(std::cin, ngheDanh);

    std::cout << "Nhap dong nhac: ";
    std::getline(std::cin, dongNhac);

    int n;
    std::cout << "Nhap so thap nien: ";
    std::cin >> n;
    thapNien.resize(n);
    std::cout << "Nhap cac thap nien: ";
    for (int i = 0; i < n; ++i) {
        std::cin >> thapNien[i];
    }
    std::cin.ignore();
}

void CaSi::xuat() const {
    std::cout << "Ma ca si: " << maCaSi << std::endl;
    std::cout << "Ho ten: " << hoTen << std::endl;
    std::cout << "Tuoi: " << tuoi << std::endl;
    std::cout << "Nghe danh: " << ngheDanh << std::endl;
    std::cout << "Dong nhac: " << dongNhac << std::endl;
    
    std::cout << "Thap nien: ";
    for (const auto& thap : thapNien) {
        std::cout << thap << " ";
    }
    std::cout << std::endl;
}

std::string CaSi::getMaCaSi() const { return maCaSi; }
void CaSi::setMaCaSi(const std::string& ma) { maCaSi = ma; }

std::string CaSi::getHoTen() const { return hoTen; }
void CaSi::setHoTen(const std::string& hoTen) { this->hoTen = hoTen; }

int CaSi::getTuoi() const { return tuoi; }
void CaSi::setTuoi(int tuoi) { this->tuoi = tuoi; }

std::string CaSi::getNgheDanh() const { return ngheDanh; }
void CaSi::setNgheDanh(const std::string& ngheDanh) { this->ngheDanh = ngheDanh; }

std::string CaSi::getDongNhac() const { return dongNhac; }
void CaSi::setDongNhac(const std::string& dongNhac) { this->dongNhac = dongNhac; }

std::vector<int> CaSi::getThapNien() const { return thapNien; }
void CaSi::setThapNien(const std::vector<int>& thapNien) { this->thapNien = thapNien; }
