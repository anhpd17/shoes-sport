#include <iostream>
#include <vector>
#include "CD.h"

int main() {
    int N;
    std::cout << "Nhap so luong album CD: ";
    std::cin >> N;
    std::cin.ignore();  

    std::vector<CD> dsCDs(N);

    for (int i = 0; i < N; ++i) {
        std::cout << "\nNhap thong tin cho CD thu " << (i + 1) << ":\n";
        dsCDs[i].nhap();
    }
    std::cout << "\nDanh sach CD:\n";
    for (const auto& cd : dsCDs) {
        cd.xuat();
        std::cout << "-----------------------------------\n";
    }

    return 0;
}
