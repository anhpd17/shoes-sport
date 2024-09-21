#ifndef CASI_H
#define CASI_H

#include <string>
#include <iostream>
#include <vector>

class CaSi {
private:
    std::string maCaSi;
    std::string hoTen;
    int tuoi;
    std::string ngheDanh;
    std::string dongNhac;
    std::vector<int> thapNien;

public:
    CaSi();
    CaSi(const std::string& ma, const std::string& hoTen, int tuoi,
         const std::string& ngheDanh, const std::string& dongNhac, 
         const std::vector<int>& thapNien);

    void nhap();
    void xuat() const;

    std::string getMaCaSi() const;
    void setMaCaSi(const std::string& ma);

    std::string getHoTen() const;
    void setHoTen(const std::string& hoTen);

    int getTuoi() const;
    void setTuoi(int tuoi);

    std::string getNgheDanh() const;
    void setNgheDanh(const std::string& ngheDanh);

    std::string getDongNhac() const;
    void setDongNhac(const std::string& dongNhac);

    std::vector<int> getThapNien() const;
    void setThapNien(const std::vector<int>& thapNien);
};

#endif // CASI_H
