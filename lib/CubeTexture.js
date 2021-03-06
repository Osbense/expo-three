import THREE from './Three';
import loadAsync from './loadAsync';
import parseAssetCallback from './loaders/parseAssetCallback';

class CubeTexture extends THREE.CubeTexture {
  static format = {
    direct_s: ['lf', 'rt', 'up', 'dn', 'ft', 'bk'],
    coord_s: ['px', 'nx', 'py', 'ny', 'pz', 'nz'],
    coord_m: ['xpos', 'xneg', 'ypos', 'yneg', 'zpos', 'zneg'],
  };
  loadAsync = async ({ assetForDirection, directions }) => {
    const nextDirections = directions || CubeTexture.format.coord_s;

    for (let direction of nextDirections) {
      const asset = await parseAssetCallback(direction, assetForDirection);
      const texture = await loadAsync(asset);
      this.images.push(texture);
    }
    this.needsUpdate = true;
  };
}

export default CubeTexture;
