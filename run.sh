#!/bin/bash
cnpm run build
cd /home/du/electron/dist/win-unpacked/
tar -cf wms_1.0.0_amd64_win.tar .
cp -rf wms_1.0.0_amd64_win.tar ../
cd ../../

npm run buildLinux
npm run buildRpm
cd /home/du/electron/dist/linux-unpacked/
tar -cf wms_1.0.0_amd64.tar .
cp -rf wms_1.0.0_amd64.tar ../
cd ../../

npm run buildLinuxArm64
npm run buildRpmArm64
cd /home/du/electron/dist/linux-arm64-unpacked/
tar -cf wms_1.0.0_arm64.tar .
cp -rf wms_1.0.0_arm64.tar ../



