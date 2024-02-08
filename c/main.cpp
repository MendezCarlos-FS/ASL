#include <ctime>
#include <iostream>
using namespace std;

int main() {
    cout << "Hello ASL!" << endl;

    time_t ttime = time(0);
    char* dt = ctime(&ttime);

    cout << dt;

    return 0;
}