import React from "react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../constants/routes";
import ButtonComponent from "../components/ui/ButtonComponent";

const CtaBanner = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-200/80">
      <div className="px-4 sm:px-8 lg:px-12 w-full">
        <div className="bg-gradient-to-r from-sky-50 via-white to-sky-100 rounded-3xl p-8 sm:p-14 text-slate-900 text-center shadow-lg border border-sky-200 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-slate-900">
              Ready to Accelerate Your Financial Growth?
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Join thousands of investors earning automated daily INR yields. Create your account in minutes and start building your portfolio today.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={AuthRoutes.REGISTER}>
                <ButtonComponent variant="primary" padding="14px 32px">
                  Create Account Free →
                </ButtonComponent>
              </Link>

              <Link to={AuthRoutes.LOGIN}>
                <ButtonComponent variant="outline" padding="14px 32px">
                  Sign In to Dashboard
                </ButtonComponent>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
