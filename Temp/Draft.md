```cpp
#include <iostream>
using namespace std;

void funa(int *a) 
{ a[0]++; }

void funb(int b[]) 
{ b[1] += 5; }

int main() { 
	int a[3] = {10, 20, 30}; 
	int b[3] = {101, 102, 103}, *p, i; 
	p = &a[0]; 
	(*p)++; 
	funb(p); 
	for (i = 0; i < 3; i++) { 
		cout << a[i]; 
	} 
	cout << endl; 
	p = &b[1]; 
	funa(p); funb(p); 
	for (i = 0; i < 3; i++) { 
		cout << b[i]; 
	} 
	return 0; 
}
```