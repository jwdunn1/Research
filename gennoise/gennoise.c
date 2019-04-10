// From: paulbourke.net/fractals/noise
// depends on randomlib.c

#include "stdio.h"
#include "stdlib.h"
#include "math.h"
#include <sys/types.h>
#include <time.h>

//#include "paulslib.h"

#define N 8192
#define TWOPOWER 13
#define TWOPI 6.283185307179586476925287

void RandomInitialise(int, int);
double RandomUniform(void);
double RandomGaussian(double, double);

/*
   This computes an in-place complex-to-complex FFT
   x and y are the real and imaginary arrays of 2^m points.
   dir =  1 gives forward transform
   dir = -1 gives reverse transform
*/
void FFT(short int dir, long m, double *x, double *y)
{
  long n, i, i1, j, k, i2, l, l1, l2;
  double c1, c2, tx, ty, t1, t2, u1, u2, z;

  /* Calculate the number of points */
  n = 1;
  for (i = 0;i < m;i++)
    n *= 2;

  /* Do the bit reversal */
  i2 = n >> 1;
  j = 0;
  for (i = 0;i < n - 1;i++) {
    if (i < j) {
      tx = x[i];
      ty = y[i];
      x[i] = x[j];
      y[i] = y[j];
      x[j] = tx;
      y[j] = ty;
    }
    k = i2;
    while (k <= j) {
      j -= k;
      k >>= 1;
    }
    j += k;
  }

  /* Compute the FFT */
  c1 = -1.0;
  c2 = 0.0;
  l2 = 1;
  for (l = 0;l < m;l++) {
    l1 = l2;
    l2 <<= 1;
    u1 = 1.0;
    u2 = 0.0;
    for (j = 0;j < l1;j++) {
      for (i = j;i < n;i += l2) {
        i1 = i + l1;
        t1 = u1 * x[i1] - u2 * y[i1];
        t2 = u1 * y[i1] + u2 * x[i1];
        x[i1] = x[i] - t1;
        y[i1] = y[i] - t2;
        x[i] += t1;
        y[i] += t2;
      }
      z = u1 * c1 - u2 * c2;
      u2 = u1 * c2 + u2 * c1;
      u1 = z;
    }
    c2 = sqrt((1.0 - c1) / 2.0);
    if (dir == 1)
      c2 = -c2;
    c1 = sqrt((1.0 + c1) / 2.0);
  }

  /* Scaling for forward transform */
  if (dir == 1) {
    for (i = 0;i < n;i++) {
      x[i] /= n;
      y[i] /= n;
    }
  }
}


/*
	Create a noise signal using fBm
*/

int main(int argc,char **argv) 
{
	int i;
	double beta,seed;
	double mag,pha;
	double real[N],imag[N];

	if (argc < 3) {
		fprintf(stderr,"Usage: %s beta seed\n",argv[0]);
		exit(0);
	}
	if ((beta = atof(argv[1])) < 1 || beta > 3) {
		fprintf(stderr,"Beta must be between 1 and 3\n");
		exit(0);
	}
	if ((seed = atof(argv[2])) <= 0) {
		seed = time(NULL) % 30000;
		RandomInitialise(seed,seed+100);
	}

	real[0] = 0;
	imag[0] = 0;
	for (i=1;i<=N/2;i++) {
		mag = pow(i+1.0,-beta/2) * RandomGaussian(0.0,1.0); // Note to self a number of years later, why "i+1"
		pha = TWOPI * RandomUniform();
		real[i] = mag * cos(pha);
		imag[i] = mag * sin(pha);
		real[N-i] =  real[i];
		imag[N-i] = -imag[i];
	}
	imag[N/2] = 0;

	FFT(-1,TWOPOWER,real,imag);

	for (i=0;i<N;i++)
		printf("%d %g\n",i,real[i]);
}


