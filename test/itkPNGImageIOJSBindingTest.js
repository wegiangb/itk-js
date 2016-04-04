/*=========================================================================
 *
 *  Copyright Insight Software Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *=========================================================================*/

if(process.argv.length < 4) {
  console.error("Usage: ", process.argv[0], process.argv[1], " moduleDir inputImage outputImage");
  process.exit(1);
}
var moduleDir = process.argv[2]
var inputImage = process.argv[3];
var outputImage = process.argv[4];
console.log("Input image: ", inputImage);
console.log("Output image: ", outputImage);

assert = require('assert');

var path = require("path");
var Module = require(path.join(moduleDir, "itkPNGImageIOJSBinding.js"));
var imageio = new Module.itkPNGImageIO();
var JSImageIOModule = require(path.join(moduleDir, "itkJSImageIO.js"));
var imagejs = new JSImageIOModule.itkJSImageIO();

console.log("Reading image...");
Module.MountContainingDirectory(inputImage);
imageio.SetFileName(inputImage);
assert.equal(imageio.GetFileName(), inputImage);
assert(imageio.CanReadFile(inputImage), "Could not read the file");
imageio.ReadImageInformation();
dimension = 2;
assert.equal(imageio.GetNumberOfDimensions(), dimension);
assert.equal(imageio.GetDimensions(0), 256);
assert.equal(imageio.GetDimensions(1), 256);
assert.equal(imageio.GetOrigin(0), 0.0);
assert.equal(imageio.GetOrigin(1), 0.0);
Module.UnmountContainingDirectory(inputImage);

////imagejs.ReadImage(inputImage);

//console.log("Writing image...");
//imagejs.MountDirectory(outputImage);
//imageio.SetNumberOfDimensions(2);
//imagejs.WriteImage(outputImage);
