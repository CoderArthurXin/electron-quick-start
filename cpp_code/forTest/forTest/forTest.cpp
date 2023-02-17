#include "pch.h"
#include <chrono>
#include <thread>

#define DllExport_C   extern "C" __declspec(dllexport)



DllExport_C int add(int i, int j) {
	int s = 0;
	try {
		throw new std::exception();
	}
	catch (...) {
		return 100;
	}
	 
	return s;
}

DllExport_C void testSleep(int i) {
	::Sleep(i * 1000);
}

DllExport_C int doSomethingTimeConsuming(int j) {
	
	int count = 0;
	for (int i = 0; i < j; ++i) {
		::Sleep(1);
		++count;
	}

	return count;
}