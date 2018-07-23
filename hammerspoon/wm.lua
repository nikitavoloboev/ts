-- WM
-- Constants
local caps = {"alt", "ctrl"}
local cmd_alt = {"cmd", "alt"}
local cmd_alt_ctrl = {"cmd", "alt", "ctrl"}
local cmd_alt_shift = {"cmd", "alt", "shift"}
local cmd_alt_ctrl_shift = {"cmd", "alt", "ctrl", "shift"}

local main_monitor = "Color LCD"
local second_monitor = "DELL U2515H"

hs.window.animationDuration = 0
hs.hotkey.alertDuration = 0

resize_current_winnum = 1
resize_win_list = hs.window.visibleWindows()

function cycle_wins_next()
    resize_win_list[resize_current_winnum]:focus()
    resize_current_winnum = resize_current_winnum + 1
    if resize_current_winnum > #resize_win_list then
        resize_current_winnum = 1
    end
end
hs.urlevent.bind("cycleWindowsNext", cycle_wins_next)

function cycle_wins_pre()
    resize_win_list[resize_current_winnum]:focus()
    resize_current_winnum = resize_current_winnum - 1
    if resize_current_winnum < 1 then
        resize_current_winnum = #resize_win_list
    end
end
hs.urlevent.bind("cycleWindowsPrevious", cycle_wins_pre)

-- Doesn't work
function showWindowHints()
    hs.hints.windowHints()
end
hs.urlevent.bind("showActiveWindows", showWindowHints)

