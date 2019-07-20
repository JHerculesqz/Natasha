echo off

echo STEP1.npm set config
call npm config set registry http://localhost:8081/repository/NpmHost/

echo STEP2.query
call npm config list

pause>null