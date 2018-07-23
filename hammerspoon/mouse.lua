-- Mouse utilities

-- Visually circle my mouse pointer
function mouseHighlight()
    -- Delete an existing highlight if it exists
    if mouseCircle then
        mouseCircle:delete()
        if mouseCircleTimer then
            mouseCircleTimer:stop()
        end
    end
    -- Get the current co-ordinates of the mouse pointer
    mousepoint = hs.mouse.getAbsolutePosition()
    -- Prepare a circle around the mouse pointer
    mouseCircle = hs.drawing.circle(hs.geometry.rect(mousepoint.x - 40, mousepoint.y - 40, 80, 80))
    mouseCircle:setStrokeColor({["red"] = 100, ["blue"] = 0, ["green"] = 40, ["alpha"] = 1})
    mouseCircle:setFill(false)
    mouseCircle:setStrokeWidth(5)
    mouseCircle:show()

    -- Set a timer to delete the circle after 2 seconds
    mouseCircleTimer =
        hs.timer.doAfter(
        2,
        function()
            mouseCircle:delete()
        end
    )
end
hs.urlevent.bind("visuallyCircleMouse", mouseHighlight)
