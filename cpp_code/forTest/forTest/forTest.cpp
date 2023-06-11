#include "pch.h"
#include <chrono>
#include <thread>

#define DllExport_C   extern "C" __declspec(dllexport)

DllExport_C long testSleep(long time) {
	::Sleep(time);

	return time;
}

