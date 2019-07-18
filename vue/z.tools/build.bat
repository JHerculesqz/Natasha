echo off

echo STEP1.xcopy 1.platform.gis
xcopy %~dp0..\1.platform.gis %~dp0..\1.platform\static\gis\ /s /y
rd /s /Q %~dp0..\1.platform\static\gis\image\

echo STEP2.xcopy 1.platform.topo
xcopy %~dp0..\1.platform.topo %~dp0..\1.platform\static\topo\ /s /y

echo STEP3.xcopy 1.platform.devPanel
xcopy %~dp0..\1.platform.devPanel %~dp0..\1.platform\static\devPanel\ /s /y

echo STEP3.xcopy 1.platform.devPanelEx
xcopy %~dp0..\1.platform.devPanelEx %~dp0..\1.platform\static\devPanelEx\ /s /y

echo STEP3.xcopy 1.platform.topoarbor
xcopy %~dp0..\1.platform.topoarbor %~dp0..\1.platform\static\topoarbor\ /s /y

pause>null