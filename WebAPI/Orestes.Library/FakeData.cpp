#include "pch.h"
#include <vector>
#include <random>

class FakeData {

    static const int NUM_ROWS = 24;
    static const int NUM_COLS = 36;

    static std::vector<std::vector<double>> GetNcpData() {
        std::vector<std::vector<double>> result(NUM_ROWS, std::vector<double>(NUM_COLS, 0.0));
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> rowDist(0, NUM_ROWS - 1);
        std::uniform_int_distribution<> colDist(0, NUM_COLS - 1);

        for (int k = 0; k < 200; k++) {
            result[rowDist(gen)][colDist(gen)] = 1;
        }

        return result;
    };
};