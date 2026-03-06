# Custom Real Images (Override Guide)

Drop your own level image files in this folder and they will be used first.

## Naming format

Use this exact pattern:

`<category>-<level>.<ext>`

Supported categories:

- `sequencing`
- `loops`
- `conditions`
- `procedures`

Supported extensions:

- `.png`
- `.jpg`
- `.jpeg`
- `.webp`
- `.svg`

## Examples

- `sequencing-1.png`  (Morning Routine)
- `sequencing-2.png`  (Make a Sandwich)
- `loops-1.png`
- `conditions-3.jpg`
- `procedures-5.webp`

## Priority

For each level, app tries in this order:

1. `images-real/<category>-<level>.png`
2. `images-real/<category>-<level>.jpg`
3. `images-real/<category>-<level>.jpeg`
4. `images-real/<category>-<level>.webp`
5. `images-real/<category>-<level>.svg`
6. default built-in SVG from `images/`

So if you place `sequencing-1.png`, it will automatically override `images/morning-routine.svg`.
