#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(location = 0) out highp vec4 out_color;

highp float random(highp float seed)
{
    return fract(43758.5453 * sin(dot(vec2(seed, seed), vec2(12.9898, 78.233))));
}

void main()
{
    highp vec4 color = subpassLoad(in_color).rgba;
    highp float random_value = random(gl_FragCoord.x);
    if (random_value < 0.2)
        out_color = vec4(0.0, 0.0, 0.0, 1.0);
    else
        out_color = color;
}
