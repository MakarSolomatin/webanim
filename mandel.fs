precision mediump float;

varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform int N;
uniform float M, W, H, WheelDelta, MouseX, MouseY, MouseDown, DeltaX, DeltaY, Scale;

float mandel()
{
  vec2 Z0 = vec2(0.0, 0.0), Z1 = Z0;
  float x0 = -2.0 - DeltaX / W, x1 = 2.0 - DeltaX / W, y0 = -2.0 + DeltaY / H, y1 = 2.0 + DeltaY / H,
        Wc = x1 - x0, Hc = y1 - y0;
  y0 = Hc * MouseY / H * (1.0 - Scale) + y0;
  y1 = Hc * Scale + y0;
  x0 = Wc * MouseX / W * (1.0 - Scale) + x0;
  x1 = Wc * Scale + x0;
  vec2 c = vec2(gl_FragCoord.x * (x1 - x0) / W + x0, gl_FragCoord.y * (y1 - y0) / H + y0);

  for (int i = 0; i < 30; i++)
  {
    Z1 = vec2(Z0.x * Z0.x - Z0.y * Z0.y, Z0.x * Z0.y + Z0.y * Z0.x) + c;

    if (sqrt(Z1.x * Z1.x + Z1.y * Z1.y) > 2.0)
      return float(i);
    Z0 = Z1;
  }
  return 0.0;
}

void main(void) {
  float k = mandel();
  gl_FragColor = texture2D(uSampler, vec2(k * .3, k));
  gl_FragColor = vec4(k / 30.0 * 3.0, k / 30.0 * 4.0, k / 30.0 * 10.0, 1.0);
}
