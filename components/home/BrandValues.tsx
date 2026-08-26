import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RefreshIcon, ShieldCheckIcon, StarIcon, TruckIcon } from "@/components/ui/icons";
import { brandValues, type BrandValueIconKey } from "@/constants/brandValues";
import { ValueCard } from "./ValueCard";

const iconByKey: Record<BrandValueIconKey, typeof StarIcon> = {
  quality: StarIcon,
  shipping: TruckIcon,
  payments: ShieldCheckIcon,
  returns: RefreshIcon,
};

/**
 * BrandValues — homepage section below Featured Products. Secondary
 * background, continuing the alternating rhythm (Hero primary →
 * Collections secondary → Products primary → Values secondary).
 */
export function BrandValues() {
  return (
    <Section background="secondary">
      <Container>
        <div className="flex flex-col gap-sm">
          <span className="text-caption font-medium text-text-secondary">Why Novaxa</span>
          <h2 className="text-h2 font-semibold text-text-primary">Built Around Trust</h2>
          <p className="max-w-2xl text-body text-text-secondary">
            Every order is held to the same standard, from material to delivery.
          </p>
        </div>

        <div className="mt-2xl grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-4">
          {brandValues.map((value) => {
            const Icon = iconByKey[value.icon];
            return (
              <ValueCard
                key={value.title}
                icon={<Icon className="h-md w-md" aria-hidden="true" />}
                title={value.title}
                description={value.description}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
