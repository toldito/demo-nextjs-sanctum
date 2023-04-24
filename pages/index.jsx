import Balancer from "react-wrap-balancer";
import {Flex, Button} from "@tremor/react";

import {Icons} from "@/components/icons";
import {GuestLayout} from "@/layouts/guest";

export default function Home() {
  return (
    <GuestLayout>
      <section className="py-20">
        <div className="container">
          <h1 className="text-6xl font-bold text-center">Beautiful analytics to grow smarter</h1>
          <div className="w-full max-w-2xl mx-auto mt-6">
            <p className="mt-4 text-xl text-center text-gray-600">
              <Balancer>
                Powerful, self-serve product and growth analytics to help you convert, engage, and
                retain more users. Trusted by over 4,000 startups.
              </Balancer>
            </p>
          </div>
          <Flex alignItems="center" className="gap-6 mt-8" justifyContent="center">
            <Button
              className="[&>p]:text-lg "
              color="indigo"
              icon={Icons.playCircle}
              size="xl"
              variant="secondary"
            >
              Read more
            </Button>
            <Button className="[&>p]:text-lg " color="indigo" size="xl">
              Sign up
            </Button>
          </Flex>
        </div>
      </section>
    </GuestLayout>
  );
}
