{
  description = "Following Road To Graphql examples";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in
  {
    devShell.${system} = with pkgs; mkShell {
      buildInputs = [
        nodejs
        nodePackages.npm
        nodePackages.typescript
      ];

    };
  };
}
