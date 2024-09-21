#ifndef CD_H
#define CD_H

#include <string>
#include <iostream>
#include <vector>
#include "CaSi.h"

class CD {
private:
    std::string maCD;
    CaSi caSi;
    std::string tuaCD;
    int soBaiHat;
    double giaThanh;
    std::string donViPhatHanh;

public:
    CD();
    CD(const std::string& maCD, const CaSi& caSi, const std::string& tuaCD, 
       int soBaiHat, double giaThanh, const std::string& donViPhatHanh);

    void nhap();
    void xuat() const;
    bool operator>(const CD& other) const;

    std::string getMaCD() const;
    void setMaCD(const std::string& maCD);

    CaSi getCaSi() const;
    void setCaSi(const CaSi& caSi);

    std::string getTuaCD() const;
    void setTuaCD(const std::string& tuaCD);

    int getSoBaiHat() const;
    void setSoBaiHat(int soBaiHat);

    double getGiaThanh() const;
    void setGiaThanh(double giaThanh);

    std::string getDonViPhatHanh() const;
    void setDonViPhatHanh(const std::string& donViPhatHanh);
};

#endif // CD_H
