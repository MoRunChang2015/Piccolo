#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

void main()
{
    highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    highp float _COLORS      = float(lut_tex_size.y);

    highp vec4 color       = subpassLoad(in_color).rgba;
    
    highp float left_offset = floor(color.b * _COLORS) / _COLORS;
    highp float right_offset = ceil(color.b * _COLORS) / _COLORS;

    highp vec2 uv_left = vec2(color.r / _COLORS + left_offset, color.g);
    highp vec2 uv_right = vec2(color.r / _COLORS + right_offset, color.g);

    // texture(color_grading_lut_texture_sampler, uv)

    highp vec4 left_color = texture(color_grading_lut_texture_sampler, uv_left);
    highp vec4 right_color = texture(color_grading_lut_texture_sampler, uv_right);

    out_color = mix(left_color, right_color, (color.b - left_offset) * _COLORS);
}
