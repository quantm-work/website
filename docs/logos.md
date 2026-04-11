# Adding Logos to the Logo Row

## SVG Requirements

Logos must be monocolor SVGs that use `currentColor` for all fills and strokes. The component renders them with `fill="var(--color-ink)"` and toggles opacity on hover — any hardcoded colors will break this.

Checklist before adding:

- All `fill` and `stroke` attributes set to `currentColor` (no hex values, no `fill="black"`)
- No hardcoded `id` attributes (causes DOM collisions when the SVG is inlined)
- No `<style>` blocks or class-based coloring
- No raster image embeds (`<image>`)
- `viewBox` must be present — `width`/`height` on the root element are ignored

### Converting fills to `currentColor`

Open the SVG in a text editor and replace all color values:

```bash
# Quick sed pass for common cases
sed -i '' 's/fill="#[0-9a-fA-F]\{3,6\}"/fill="currentColor"/g' logo.svg
sed -i '' 's/fill="black"/fill="currentColor"/g' logo.svg
sed -i '' 's/fill="rgb(0,0,0)"/fill="currentColor"/g' logo.svg
```

Verify visually — some logos use `fill="none"` intentionally on container shapes; leave those alone.

---

## The PINF Formula

Logos have wildly different aspect ratios. Rendering them all at a fixed `48×48` box makes wide logos look tiny and tall logos look huge. The **PINF formula** normalises perceived size by scaling width proportionally to the square root of the aspect ratio, while keeping height fixed at 48px. The square root dampens the effect so extreme ratios (e.g. 5:1 banners) don't become comically wide.

```
normalizedWidth  = Math.round((viewBoxWidth / viewBoxHeight) ** 0.5 * 48)
normalizedHeight = 48
```

Example — JPMorgan SVG has `viewBox="0 0 570 150"`:

```
normalizedWidth  = Math.round((570 / 150) ** 0.5 * 48)
                 = Math.round(1.949 * 48)
                 = Math.round(93.6)
                 = 94
normalizedHeight = 48
```

So the `<svg>` element gets `width={94} height={48}`.

---

## Adding a Logo: Step by Step

1. **Get the SVG.** Use the official press/brand kit. Prefer the monochrome or single-color variant.

2. **Clean the SVG.** Apply the `currentColor` conversion above. Remove `id` attributes and `<style>` blocks. Keep the `viewBox`.

3. **Save the file** to `src/assets/logos/<slug>.svg`. Slug should be lowercase, hyphenated (e.g. `jp-morgan.svg`).

4. **Compute PINF dimensions.** Read the `viewBox` from your SVG and apply the formula:
   ```ts
   const viewBoxWidth = 570;
   const viewBoxHeight = 150;
   const w = Math.round((viewBoxWidth / viewBoxHeight) ** 0.5 * 48); // 94
   const h = 48;
   ```

5. **Add the entry to `logo-row.tsx`.** Import the SVG paths as a React component or inline the paths directly. Add an object to the `logos` array:

   ```tsx
   {
     name: "JPMorgan",
     render: () => (
       <svg
         role="img"
         width={94}
         height={48}
         viewBox="0 0 570 150"
         fill="currentColor"
       >
         <title>JPMorgan</title>
         {/* paste path elements here */}
       </svg>
     ),
   },
   ```

   > Note: the outer `<svg>` in `LogoRow` already sets `fill="var(--color-ink)"`. If you inline paths inside the existing wrapper, omit the inner `<svg>` and just return the `<path>` elements directly from `render()`. Only add a nested `<svg>` if you need a different `viewBox`.

6. **Check the result** at `localhost:3000` — the logo should sit flush with the others at roughly the same visual weight.

---

## Logo Soup Principles

- **Avoid logos with fine detail or thin strokes.** At 48px height they become noise. Prefer bold, geometric marks.
- **Avoid all-caps wordmarks wider than ~6:1 aspect ratio.** Even with PINF they will dwarf the row.
- **Maintain consistent opacity behaviour.** Do not override the `opacity-30 hover:opacity-70` classes on individual logos — the fade is intentional.
- **Use only one logo per brand.** No lockups (icon + wordmark) alongside standalone marks for the same company.
- **Match visual style across the set.** All logos should read as the same visual weight at a glance. If one logo is conspicuously darker or more complex, it will draw the eye and break the rhythm.
