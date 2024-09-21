#include "CD.h"

CD::CD() : maCD("CD00000"), caSi(), tuaCD(""), soBaiHat(0), giaThanh(0.0), donViPhatHanh("") {}

CD::CD(const std::string& maCD, const CaSi& caSi, const std::string& tuaCD, 
       int soBaiHat, double giaThanh, const std::string& donViPhatHanh)
    : maCD(maCD), caSi(caSi), tuaCD(tuaCD), soBaiHat(soBaiHat), giaThanh(giaThanh), donViPhatHanh(donViPhatHanh) {
    if (maCD.size() != 7 || maCD.substr(0, 2) != "CD") {
        throw std::invalid_argument("Ma CD phai co 7 ky tu va bat dau bang 'CD'");
    }
    if (soBaiHat <= 0) {
        throw std::invalid_argument("So bai hat phai lon hon 0");
    }
    if (giaThanh <= 0) {
        throw std::invalid_argument("Gia thanh phai lon hon 0");
    }
}

void CD::nhap() {
    std::cout << "Nhap ma CD (7 ky tu, bat dau bang 'CD'): ";
    std::getline(std::cin, maCD);
    if (maCD.size() != 7 || maCD.substr(0, 2) != "CD") {
        throw std::invalid_argument("Ma CD phai co 7 ky tu va bat dau bang 'CD'");
    }

    std::cout << "Nhap thong tin ca si:\n";
    caSi.nhap();

    std::cout << "Nhap tua CD: ";
    std::getline(std::cin, tuaCD);

    std::cout << "Nhap so bai hat: ";
    std::cin >> soBaiHat;
    if (soBaiHat <= 0) {
        throw std::invalid_argument("So bai hat phai lon hon 0");
    }

    std::cout << "Nhap gia thanh: ";
    std::cin >> giaThanh;
    if (giaThanh <= 0) {
        throw std::invalid_argument("Gia thanh phai lon hon 0");
    }
    std::cin.ignore();

    std::cout << "Nhap don vi phat hanh: ";
    std::getline(std::cin, donViPhatHanh);
}

void CD::xuat() const {
    std::cout << "Ma CD: " << maCD << std::endl;
    std::cout << "Thong tin ca si: \n";
    caSi.xuat();
    std::cout << "Tua CD: " << tuaCD << std::endl;
    std::cout << "So bai hat: " << soBaiHat << std::endl;
    std::cout << "Gia thanh: " << giaThanh << std::endl;
    std::cout << "Don vi phat hanh: " << donViPhatHanh << std::endl;
}

bool CD::operator>(const CD& other) const {
    return giaThanh > other.giaThanh;
}

std::string CD::getMaCD() const { return maCD; }
void CD::setMaCD(const std::string& maCD) { this->maCD = maCD; }

CaSi CD::getCaSi() const { return caSi; }
void CD::setCaSi(const CaSi& caSi) { this->caSi = caSi; }

std::string CD::getTuaCD() const { return tuaCD; }
void CD::setTuaCD(const std::string& tuaCD) { this->tuaCD = tuaCD; }

int CD::getSoBaiHat() const { return soBaiHat; }
void CD::setSoBaiHat(int soBaiHat) { this->soBaiHat = soBaiHat; }

double CD::getGiaThanh() const { return giaThanh; }
void CD::setGiaThanh(double giaThanh) { this->giaThanh = giaThanh; }

std::string CD::getDonViPhatHanh() const { return donViPhatHanh; }
void CD::setDonViPhatHanh(const std::string& donViPhatHanh) { this->donViPhatHanh = donViPhatHanh; }
