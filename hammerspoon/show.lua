-- SHOW things in middle of screen.

-- Colors
red = {red = 229 / 255, blue = 66 / 255, green = 77 / 255, alpha = 1}
white = hs.drawing.color.white
black = hs.drawing.color.black
blue = hs.drawing.color.blue
osx_red = hs.drawing.color.osx_red
osx_green = hs.drawing.color.osx_green
osx_yellow = hs.drawing.color.osx_yellow
tomato = hs.drawing.color.x11.tomato
dodgerblue = hs.drawing.color.x11.dodgerblue
firebrick = hs.drawing.color.x11.firebrick
lawngreen = hs.drawing.color.x11.lawngreen
lightseagreen = hs.drawing.color.x11.lightseagreen
purple = hs.drawing.color.x11.purple
royalblue = hs.drawing.color.x11.royalblue
sandybrown = hs.drawing.color.x11.sandybrown
black50 = {red = 0, blue = 0, green = 0, alpha = 0.5}
darkblue = {red = 24 / 255, blue = 195 / 255, green = 145 / 255, alpha = 1}

-- Show Current Time
function showTime()
    if not time_draw then
        local mainScreen = hs.screen.mainScreen()
        local mainRes = mainScreen:fullFrame()
        local time_str =
            hs.styledtext.new(
            os.date("%H:%M"),
            {font = {name = "Impact", size = 120}, color = red, paragraphStyle = {alignment = "center"}}
        )
        local timeframe = hs.geometry.rect((mainRes.w - 300) / 2, (mainRes.h - 200) / 2, 300, 150)
        time_draw = hs.drawing.text(timeframe, time_str)
        time_draw:setLevel(hs.drawing.windowLevels.overlay)
        time_draw:show()
        timer =
            hs.timer.doAfter(
            4,
            function()
                time_draw:delete()
                time_draw = nil
            end
        )
    else
        time_draw:delete()
        time_draw = nil
    end
end
hs.urlevent.bind("showTime", showTime)
