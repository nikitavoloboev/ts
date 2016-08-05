--------------------------------------------------------------------------------
-- -constants
--------------------------------------------------------------------------------
local cmd_alt = {"cmd", "alt"}
local cmd_alt_ctrl = {"cmd", "alt", "ctrl"}
local main_monitor = "Color LCD"
local second_monitor = "DELL U2515H"

hs.window.animationDuration = 0 

-- needed for cli utility I use to reload config
require("hs.ipc")

-- reload config from hotkey
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "U", function()
  hs.reload()
end)

-- show my todo task in a neat window briefly
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "I", function()
hs.alert.show( ( hs.execute("~/Documents/app/bitbar/todo") ) )
end)

-- called on every config reload to notify if it was reloaded
hs.alert.show("config loaded")

