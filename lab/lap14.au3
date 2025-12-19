; W14.01 - Test Calculator Windows v?i AutoIt
; Các phép toán co b?n 2 toán h?ng

#include <MsgBoxConstants.au3>

; Hàm kh?i ch?y Calculator
Func StartCalculator()
    ; Ðóng Calculator n?u dang m?
    If ProcessExists("Calculator.exe") Then
        ProcessClose("Calculator.exe")
        Sleep(1000)
    EndIf

    ; M? Calculator
    Run("calc.exe")

    ; Ð?i c?a s? Calculator m?
    Local $hWnd = WinWait("[CLASS:ApplicationFrameWindow]", "", 10)
    If $hWnd = 0 Then
        ; Th? v?i Windows 7/8/10 cu
        $hWnd = WinWait("[CLASS:CalcFrame]", "", 10)
        If $hWnd = 0 Then
            $hWnd = WinWait("[CLASS:Windows.UI.Core.CoreWindow]", "Calculator", 10)
        EndIf
    EndIf

    ; Ð?m b?o Calculator là c?a s? active
    WinActivate($hWnd)
    WinWaitActive($hWnd)

    Return $hWnd
EndFunc

; Hàm nh?n nút trên Calculator
Func ClickButton($button)
    Local $control = "[CLASS:Button; INSTANCE:" & $button & "]"
    ControlClick("", "", $control)
    Sleep(300) ; Ð?i d? Calculator x? lý
EndFunc

; Hàm th?c hi?n phép tính
Func PerformCalculation($num1, $operation, $num2)
    ; Chuy?n s? thành chu?i và nh?n các nút tuong ?ng
    Local $num1Str = String($num1)
    For $i = 1 To StringLen($num1Str)
        Local $digit = StringMid($num1Str, $i, 1)
        Select
            Case $digit = "0"
                ClickButton(24) ; Nút 0
            Case $digit = "1"
                ClickButton(19) ; Nút 1
            Case $digit = "2"
                ClickButton(20) ; Nút 2
            Case $digit = "3"
                ClickButton(21) ; Nút 3
            Case $digit = "4"
                ClickButton(14) ; Nút 4
            Case $digit = "5"
                ClickButton(15) ; Nút 5
            Case $digit = "6"
                ClickButton(16) ; Nút 6
            Case $digit = "7"
                ClickButton(9)  ; Nút 7
            Case $digit = "8"
                ClickButton(10) ; Nút 8
            Case $digit = "9"
                ClickButton(11) ; Nút 9
            Case $digit = "."
                ClickButton(23) ; Nút th?p phân
            Case $digit = "-"
                ClickButton(8)  ; Nút +/-
        EndSelect
    Next

    Sleep(500)

    ; Nh?n nút phép toán
    Switch $operation
        Case "+"
            ClickButton(18) ; Nút c?ng
        Case "-"
            ClickButton(17) ; Nút tr?
        Case "*"
            ClickButton(12) ; Nút nhân
        Case "/"
            ClickButton(13) ; Nút chia
    EndSwitch

    Sleep(500)

    ; Nh?p s? th? hai
    Local $num2Str = String($num2)
    For $i = 1 To StringLen($num2Str)
        Local $digit = StringMid($num2Str, $i, 1)
        Select
            Case $digit = "0"
                ClickButton(24) ; Nút 0
            Case $digit = "1"
                ClickButton(19) ; Nút 1
            Case $digit = "2"
                ClickButton(20) ; Nút 2
            Case $digit = "3"
                ClickButton(21) ; Nút 3
            Case $digit = "4"
                ClickButton(14) ; Nút 4
            Case $digit = "5"
                ClickButton(15) ; Nút 5
            Case $digit = "6"
                ClickButton(16) ; Nút 6
            Case $digit = "7"
                ClickButton(9)  ; Nút 7
            Case $digit = "8"
                ClickButton(10) ; Nút 8
            Case $digit = "9"
                ClickButton(11) ; Nút 9
            Case $digit = "."
                ClickButton(23) ; Nút th?p phân
            Case $digit = "-"
                ClickButton(8)  ; Nút +/-
        EndSelect
    Next

    Sleep(500)

    ; Nh?n nút b?ng
    ClickButton(28) ; Nút =

    Sleep(1000) ; Ð?i k?t qu?
EndFunc

; Hàm d?c k?t qu? t? Calculator
Func GetResult()
    ; L?y k?t qu? t? display
    Local $result = ControlGetText("", "", "[CLASS:Static; INSTANCE:2]")

    ; Th? các control khác n?u không tìm th?y
    If $result = "" Then
        $result = ControlGetText("", "", "[CLASS:Static; INSTANCE:1]")
    EndIf

    If $result = "" Then
        $result = ControlGetText("", "", "[CLASS:Windows.UI.Core.CoreWindow]")
    EndIf

    Return $result
EndFunc

; Hàm ki?m tra k?t qu?
Func TestCalculation($testName, $num1, $operation, $num2, $expectedResult)
    ; Xóa màn hình tru?c khi th?c hi?n phép tính m?i
    ClickButton(3) ; Nút Clear (C)
    Sleep(300)

    ; Th?c hi?n phép tính
    PerformCalculation($num1, $operation, $num2)

    ; L?y k?t qu?
    Local $actualResult = GetResult()

    ; So sánh k?t qu?
    Local $passed = False

    ; X? lý các tru?ng h?p d?c bi?t
    If $operation = "/" And $num2 = 0 Then
        ; Phép chia cho 0
        If StringInStr($actualResult, "Cannot") > 0 Or StringInStr($actualResult, "Error") > 0 Or StringInStr($actualResult, "infinit") > 0 Then
            $passed = True
        EndIf
    Else
        ; So sánh s?
        If Number($actualResult) = Number($expectedResult) Then
            $passed = True
        EndIf
    EndIf

    ; Hi?n th? k?t qu? ki?m th?
    If $passed Then
        ConsoleWrite("PASS: " & $testName & " - " & $num1 & " " & $operation & " " & $num2 & " = " & $actualResult & @CRLF)
        Return True
    Else
        ConsoleWrite("FAIL: " & $testName & " - Expected: " & $expectedResult & " | Actual: " & $actualResult & @CRLF)
        Return False
    EndIf
EndFunc

; Hàm chính
Func Main()
    ; Kh?i ch?y Calculator
    Local $hCalc = StartCalculator()
    If $hCalc = 0 Then
        MsgBox($MB_ICONERROR, "L?i", "Không th? m? Calculator!")
        Return
    EndIf

    ; Ð?i Calculator s?n sàng
    Sleep(2000)

    ; Ð?t Calculator v? ch? d? Standard n?u c?n
    Send("^1") ; Ctrl+1 cho ch? d? Standard
    Sleep(1000)

    ; Danh sách các test case
    Local $testCases[0][5]

    ; Thêm test cases
    _ArrayAdd($testCases, "Test 1|5|+|3|8")
    _ArrayAdd($testCases, "Test 2|10|-|4|6")
    _ArrayAdd($testCases, "Test 3|7|*|6|42")
    _ArrayAdd($testCases, "Test 4|20|/|5|4")
    _ArrayAdd($testCases, "Test 5|15|/|3|5")
    _ArrayAdd($testCases, "Test 6|9|-|12|-3")
    _ArrayAdd($testCases, "Test 7|0|*|15|0")
    _ArrayAdd($testCases, "Test 8|3.5|+|2.5|6")
    _ArrayAdd($testCases, "Test 9|100|/|0|Error") ; Chia cho 0

    ; Th?c hi?n các test case
    Local $totalTests = UBound($testCases)
    Local $passedTests = 0

    ConsoleWrite("=== B?t d?u ki?m th? Calculator ===" & @CRLF)

    For $i = 0 To $totalTests - 1
        Local $testName = $testCases[$i][0]
        Local $num1 = $testCases[$i][1]
        Local $operation = $testCases[$i][2]
        Local $num2 = $testCases[$i][3]
        Local $expected = $testCases[$i][4]

        If TestCalculation($testName, $num1, $operation, $num2, $expected) Then
            $passedTests += 1
        EndIf

        Sleep(1000) ; Ð?i gi?a các test
    Next

    ; T?ng k?t
    ConsoleWrite("=== K?t qu? ki?m th? ===" & @CRLF)
    ConsoleWrite("T?ng s? test: " & $totalTests & @CRLF)
    ConsoleWrite("Test passed: " & $passedTests & @CRLF)
    ConsoleWrite("Test failed: " & ($totalTests - $passedTests) & @CRLF)

    ; Hi?n th? k?t qu?
    MsgBox($MB_OK, "K?t qu? ki?m th?", "Ðã hoàn thành ki?m th? Calculator!" & @CRLF & _
           "T?ng s? test: " & $totalTests & @CRLF & _
           "Test passed: " & $passedTests & @CRLF & _
           "Test failed: " & ($totalTests - $passedTests))

    ; Ðóng Calculator
    If ProcessExists("Calculator.exe") Then
        ProcessClose("Calculator.exe")
    EndIf
EndFunc

; Ch?y chuong trình chính
Main()