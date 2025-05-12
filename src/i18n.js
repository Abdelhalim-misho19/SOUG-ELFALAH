import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          login: 'Login',
          home: 'Home',
          products: 'Products',
          services: 'Services',
          about_us: 'About Us',
          contact_us: 'Contact Us',
          support_24_7: 'Support 24/7',
          all_category: 'All Category',
          select_category: 'Select Category',
          search: 'Search',
          search_placeholder: 'What do you need',
          footer: {
            useful_links: 'Useful Links',
            links: {
              about_us: 'About Us',
              about_our_shop: 'About Our Shop',
              delivery_information: 'Delivery Information',
              privacy_policy: 'Privacy Policy',
              services: 'Services',
              our_service: 'Our Service',
              company_profile: 'Company Profile'
            },
            contact: {
              title: 'Contact',
              address: 'Address: city center, Ain Azel, Setif',
              phone: 'Phone: +213-0776771666',
              email: 'soug.elfalah@gmail.com'
            },
            copyright: 'Copyright © 2025 All Rights Reserved'
          },
          about: {
            hero: {
              title: 'SOUG EL-FALAH: Sowing Unity, Reaping Progress',
              description: 'A vibrant digital soug for Algeria’s agricultural soul – uniting farmers, services, and innovation in one thriving ecosystem.'
            },
            story: {
              title: 'A Tramway Dream Takes Root',
              description1: 'Great ideas often sprout in unexpected places. For SOUG EL-FALAH, it was a tramway ride through Algiers’ bustling streets that sparked it all. Yahiaoui Abdelhalim, one of our co-founders, gazed out the window, watching the rhythm of daily life, and imagined a digital bridge for Algeria’s agricultural community.',
              description2: 'He saw farmers with rich harvests, service providers with expertise, and consumers seeking quality, all disconnected by fragmented markets. Why not create a platform to unite them? This tramway epiphany became a shared vision with Ledjridi Boudjama, a fellow Master’s student. Together, they planted the seeds for SOUG EL-FALAH, blending passion, technology, and purpose.'
            },
            what_we_do: {
              title: 'Your Growth Partner',
              products: {
                title: 'Bountiful Products',
                description: 'From fertile seeds to sturdy tools and fresh produce, explore a diverse harvest of agricultural goods from trusted local vendors.'
              },
              services: {
                title: 'Expert Services',
                description: 'Access soil experts, equipment rentals, or skilled labor. Our platform connects you to professionals who nurture your success.'
              },
              delivery: {
                title: 'Swift Delivery',
                description: 'Our in-house shipping ensures your orders arrive promptly, from small tools to bulk supplies, right to your farm’s gate.'
              }
            },
            roots: {
              title: 'Rooted in Knowledge, Growing Forward',
              description1: 'We’re Yahiaoui Abdelhalim and Ledjridi Boudjama, Master’s students channeling our academic energy into real-world impact. SOUG EL-FALAH is our labor of love, born from a desire to empower Algeria’s agricultural backbone.',
              description2: 'Our project thrives within our university’s incubator, a badge of honor that fuels our drive for excellence. SOUG EL-FALAH is an officially recognized innovation, blending cutting-edge tech with heartfelt service.',
              description3: 'Our dream? To cultivate a digital oasis where farmers, vendors, and consumers connect seamlessly, driving prosperity across Algeria’s fields and beyond.'
            },
            why_choose_us: {
              title: 'Why Sow with SOUG EL-FALAH?',
              agri_centric: {
                title: 'Agri-Centric',
                description: 'Tailored for farmers'
              },
              all_in_one: {
                title: 'All-in-One',
                description: 'Shop with ease'
              },
              dependable: {
                title: 'Dependable',
                description: 'Fast shipping'
              },
              community: {
                title: 'Community',
                description: 'United we grow'
              },
              innovative: {
                title: 'Innovative',
                description: 'Backed by research'
              }
            },
            cta: {
              title: 'Plant Your Future With Us',
              description: 'From sourcing premium supplies to connecting with top-tier services or growing your vendor reach, SouG El Falah is your partner in progress.',
              browse_products: 'Browse Products',
              find_services: 'Find Services',
              join_soug: 'Join Our SOUG'
            }
          },
          contact: {
            title: 'Contact SOUG EL-FALAH',
            description: 'Don’t hesitate to contact us if you have any problems with the site, suggestions for us, or if you have any proposals or questions concerning a possible partnership or services. We’ll do our best to answer you as soon as possible.',
            info: {
              address_label: 'Address',
              address: 'Ain Azel, Setif, Algeria',
              email_label: 'E-mail',
              phone_label: 'Phone'
            },
            form: {
              title: 'Contact us',
              email_placeholder: 'E-mail*',
              name_placeholder: 'Your Name*',
              phone_placeholder: 'Phone number',
              subject_placeholder: 'Object*',
              subject_options: {
                general_inquiry: 'General Inquiry',
                partnership_proposal: 'Partnership Proposal',
                technical_support: 'Technical Support',
                feedback_suggestion: 'Feedback/Suggestion',
                advertising: 'Advertising',
                other: 'Other'
              },
              message_placeholder: 'Message*',
              submit_button: 'SEND',
              recaptcha_error: 'Please complete the reCAPTCHA verification.',
              required_fields_error: 'Please fill in all required fields.',
              success_message: 'Message sent successfully! (Frontend simulation)'
            },
            map_title: 'Université Ferhat Abbas Sétif 1 - Campus El Bez Location Map'
          },
          login_page: {
            title: 'login',
            form: {
              email_label: 'Email Address',
              email_placeholder: 'you@example.farm',
              password_label: 'Password',
              password_placeholder: 'Enter your password',
              show_password: 'Show password',
              hide_password: 'Hide password',
              forgot_password: 'Forgot Password?',
              login_button: 'Login',
              logging_in: 'Logging In...'
            },
            social_divider: 'Or Login With',
            social: {
              facebook: 'Facebook',
              google: 'Google'
            },
            register_prompt: 'Don’t have an account?',
            register_link: 'Register Now',
            seller_area: 'Seller Area',
            seller_login: 'Seller Login',
            seller_registration: 'Seller Registration',
            image_alt: 'Login illustration'
          },
          register: {
            title: 'Create an Account',
            form: {
              name_label: 'Full Name',
              name_placeholder: 'e.g., Alex Green',
              email_label: 'Email Address',
              email_placeholder: 'you@example.farm',
              password_label: 'Password',
              password_placeholder: 'Create a secure password',
              show_password: 'Show password',
              hide_password: 'Hide password',
              confirm_password_label: 'Confirm Password',
              confirm_password_placeholder: 'Re-enter your password',
              show_confirm_password: 'Show confirm password',
              hide_confirm_password: 'Hide confirm password',
              password_strength: 'Password Strength',
              password_mismatch: 'Passwords do not match.',
              password_too_weak: 'Password is too weak. Please choose a stronger one including numbers, symbols, or longer length.',
              processing: 'Processing...',
              submit_button: 'Create Account & Send OTP'
            },
            strength: {
              very_weak: 'Very Weak',
              weak: 'Weak',
              fair: 'Fair',
              good: 'Good',
              strong: 'Strong'
            },
            social_divider: 'Or Continue With',
            social: {
              facebook: 'Facebook',
              google: 'Google'
            },
            login_prompt: 'Already have an account?',
            login_link: 'Login Here',
            seller_area: 'Are you a Seller?',
            seller_login: 'Seller Login',
            seller_registration: 'Seller Registration',
            otp: {
              title: 'Verify Your Email',
              description: 'Enter the 6-digit code sent to <strong>{email}</strong>. Code expires in 10 minutes.',
              label: 'Verification Code (OTP)',
              placeholder: '------',
              invalid_otp: 'Please enter the 6-digit OTP.',
              session_error: 'Session error. Please try registering again.',
              resending: 'Resending OTP...',
              resend_error: 'Cannot resend OTP. Please start the registration process again.',
              no_code: 'Didn’t receive code?',
              resend: 'Resend OTP',
              different_email: 'Use a different email',
              verifying: 'Verifying...',
              submit_button: 'Verify & Complete Registration'
            },
            image_alt: 'Soug El Falah - Agricultural Marketplace'
          },
          forgot_password: {
            title: 'Forgot Your Password?',
            description: 'Enter your email address below. If it’s registered and verified, we’ll send you a password reset link.',
            form: {
              email_label: 'Email Address',
              email_placeholder: 'Enter your registered email',
              email_required: 'Please enter your email address.',
              sending: 'Sending Link...',
              submit_button: 'Send Password Reset Link'
            },
            login_prompt: 'Remember your password?',
            login_link: 'Login Here'
          },
          reset_password: {
            title: 'Set New Password',
            description: 'Please enter and confirm your new password below.',
            form: {
              password_label: 'New Password',
              password_placeholder: 'Enter new password (min. 6 chars)',
              show_password: 'Show password',
              hide_password: 'Hide password',
              confirm_password_label: 'Confirm New Password',
              confirm_password_placeholder: 'Re-enter new password',
              show_confirm_password: 'Show confirm password',
              hide_confirm_password: 'Hide confirm password',
              fields_required: 'Please fill in both password fields.',
              password_too_short: 'Password must be at least 6 characters.',
              password_mismatch: 'Passwords do not match.',
              invalid_token: 'Invalid or missing reset token.',
              invalid_link: 'Invalid password reset link.',
              resetting: 'Resetting...',
              submit_button: 'Set New Password'
            },
            login_prompt: 'Return to',
            login_link: 'Login'
          },
          dashboard: {
            total_orders: 'Orders',
            pending_orders: 'Pending Orders',
            cancelled_orders: 'Cancelled Orders',
            recent_orders: 'Recent Orders',
            table: {
              order_id: 'Order Id',
              price: 'Price',
              payment_status: 'Payment Status',
              order_status: 'Order Status',
              action: 'Action',
              view: 'View',
              pay_now: 'Pay Now'
            }
          },
          dashboard_menu: {
            dashboard: 'Dashboard',
            my_orders: 'My Orders',
            my_bookings: 'My Bookings',
            wishlist: 'Wishlist',
            chat: 'Chat',
            change_password: 'Change Password',
            logout: 'Logout'
          },
          order_details: {
            deliver_to: 'Deliver To',
            home: 'Home',
            email_to: 'Email To',
            price: 'Price',
            include_shipping: 'Include Shipping',
            payment_status: 'Payment Status',
            order_status: 'Order Status',
            order_products: 'Order Products',
            brand: 'Brand',
            quantity: 'Quantity',
            no_products: 'No products available',
            status: {
              paid: 'Paid',
              unpaid: 'Unpaid',
              pending: 'Pending',
              shipped: 'Shipped',
              delivered: 'Delivered'
            }
          },
          orders: {
            my_orders: 'My Orders',
            order_status: 'Order Status',
            no_orders: 'No orders available',
            table: {
              order_id: 'Order Id',
              price: 'Price',
              payment_status: 'Payment Status',
              order_status: 'Order Status',
              action: 'Action',
              view: 'View',
              pay_now: 'Pay Now'
            },
            status: {
              paid: 'Paid',
              unpaid: 'Unpaid',
              placed: 'Placed',
              pending: 'Pending',
              cancelled: 'Cancelled',
              warehouse: 'Warehouse'
            }
          },
          bookings: {
            my_bookings: 'My Bookings',
            no_bookings: 'You haven\'t made any bookings yet.',
            book_service: 'Book a Service',
            na: 'N/A',
            table: {
              service: 'Service',
              provider: 'Provider',
              date: 'Date',
              time: 'Time',
              status: 'Status',
              booked_on: 'Booked On',
              action: 'Action',
              view: 'View'
            },
            status: {
              pending: 'Pending',
              confirmed: 'Confirmed',
              cancelled: 'Cancelled',
              completed: 'Completed'
            }
          },
          booking_details: {
            title: 'Booking Details',
            booked_on: 'Booked On',
            not_found: 'Booking details not found.',
            na: 'N/A',
            service_provider: {
              title: 'Service & Provider',
              service: 'Service',
              price: 'Price',
              provider: 'Provider',
              provider_contact: 'Provider Contact'
            },
            booking_info: {
              title: 'Booking Details',
              requested_date: 'Requested Date',
              requested_time: 'Requested Time',
              status: 'Status'
            },
            user_info: {
              title: 'Your Information',
              name: 'Name',
              phone: 'Phone'
            },
            notes: {
              title: 'Additional Notes'
            },
            status: {
              pending: 'Pending',
              confirmed: 'Confirmed',
              cancelled: 'Cancelled',
              completed: 'Completed'
            }
          },
          change_password: {
            title: 'Change Your Password',
            social_login_message: 'Password management is not available for accounts registered using {method}. Please manage your password through your social provider.',
            success_message: 'Password updated successfully!',
            form: {
              current_password: 'Current Password',
              current_password_placeholder: 'Enter your current password',
              new_password: 'New Password',
              new_password_placeholder: 'Enter new password (min. 6 chars)',
              confirm_password: 'Confirm New Password',
              confirm_password_placeholder: 'Re-enter new password',
              toggle_current_password: 'Toggle current password visibility',
              toggle_new_password: 'Toggle new password visibility',
              toggle_confirm_password: 'Toggle confirm password visibility',
              update_password: 'Update Password',
              updating: 'Updating...'
            },
            errors: {
              fill_all_fields: 'Please fill all password fields.',
              password_too_short: 'New password must be at least 6 characters long.',
              password_mismatch: 'New passwords do not match.',
              same_password: 'New password cannot be the same as the old one.'
            }
          },
          chat: {
            title: 'Message',
            placeholder: 'Input message',
            select_seller: 'Select Seller',
            new_message: ' sent a message'
          },
          product_details: {
            product_details: 'Product Details',
            home: 'Home',
            price: 'Price',
            shop_name: 'Shop Name',
            add_to_cart: 'Add To Cart',
            buy_now: 'Buy Now',
            chat_seller: 'Chat Seller',
            availability: 'Availability',
            share_on: 'Share On',
            in_stock: 'In Stock ',
            out_of_stock: 'Out Of Stock',
            reviews: 'reviews',
            description: 'Description',
            related_products: 'Related Products',
            from_shop: 'From {shopName}',
            loading: 'Loading...'
          },
          shops: {
            products_page: 'Products Page',
            shop: 'Shop',
            filter_product: 'Filter Product',
            category: 'Category',
            price: 'Price',
            rating: 'Rating',
            products_count: ' Products',
            sort_by: 'Sort By',
            low_to_high: 'Low to High Price',
            high_to_low: 'High to Low Price',
            latest_product: 'Latest Product'
          },
          shipping: {
            shipping_page: 'Shipping Page',
            shipping: 'Shipping',
            shipping_information: 'Shipping Information',
            name: 'Name',
            name_placeholder: 'Name',
            address: 'Address',
            address_placeholder: 'Address',
            phone: 'Phone',
            phone_placeholder: 'Phone',
            post: 'Post',
            post_placeholder: 'Post',
            province: 'Province',
            province_placeholder: 'Province',
            city: 'City',
            city_placeholder: 'City',
            area: 'Area',
            area_placeholder: 'Area',
            save_change: 'Save Change',
            deliver_to: 'Deliver To ',
            home: 'Home',
            change: 'Change',
            email_to: 'Email To ',
            order_summary: 'Order Summary',
            items_total: 'Items Total ',
            delivery_fee: 'Delivery Fee',
            total_payment: 'Total Payment',
            total: 'Total',
            place_order: 'Place Order',
            brand: 'Brand:'
          },
          payment: {
            order_summary: 'Order Summary',
            items_and_shipping: ' Item(s) & Shipping',
            total_amount: 'Total Amount',
            stripe: 'Stripe',
            cash_on_delivery: 'Cash on Delivery',
            pay_with_stripe: 'Pay with Stripe',
            confirm_cash_on_delivery: 'Confirm Cash on Delivery',
            cod_message: 'You will pay the total amount in cash when your order is delivered. Click the button below to confirm your order.',
            confirm_cod_order: 'Confirm COD Order',
            error_order_details_missing: 'Error: Order Details Missing',
            error_message: 'We couldn\'t find the necessary details for your order payment. This might happen if you refreshed the page or navigated here directly.',
            return_to_cart: 'Return to Cart'
          }
        },
      },
      ar: {
        translation: {
          login: 'تسجيل الدخول',
          home: 'الرئيسية',
          products: 'المنتجات',
          services: 'الخدمات',
          about_us: 'معلومات عنا',
          contact_us: 'اتصل بنا',
          support_24_7: 'الدعم على مدار الساعة',
          all_category: 'جميع الفئات',
          select_category: 'اختر الفئة',
          search: 'بحث',
          search_placeholder: 'ماذا تحتاج',
          footer: {
            useful_links: 'روابط مفيدة',
            links: {
              about_us: 'معلومات عنا',
              about_our_shop: 'حول متجرنا',
              delivery_information: 'معلومات التوصيل',
              privacy_policy: 'سياسة الخصوصية',
              services: 'الخدمات',
              our_service: 'خدمتنا',
              company_profile: 'ملف الشركة'
            },
            contact: {
              title: 'اتصل بنا',
              address: 'العنوان: وسط المدينة، عين أزال، سطيف',
              phone: 'الهاتف: +213-0776771666',
              email: 'soug.elfalah@gmail.com'
            },
            copyright: 'حقوق الطبع والنشر © 2025 جميع الحقوق محفوظة'
          },
          about: {
            hero: {
              title: 'سوق الفلاح: زراعة الوحدة، حصاد التقدم',
              description: 'سوق رقمي نابض بالحياة لروح الزراعة الجزائرية – يوحد المزارعين والخدمات والابتكار في نظام بيئي مزدهر.'
            },
            story: {
              title: 'حلم الترامواي يتجذر',
              description1: 'غالبًا ما تنبت الأفكار العظيمة في أماكن غير متوقعة. بالنسبة لسوق الفلاح، كانت رحلة ترامواي عبر شوارع الجزائر النابضة بالحياة هي التي أشعلت الفكرة. يحياوي عبد الحليم، أحد مؤسسينا، نظر من النافذة، يراقب إيقاع الحياة اليومية، وتخيل جسرًا رقميًا لمجتمع الزراعة الجزائري.',
              description2: 'رأى مزارعين بحصاد وفير، ومقدمي خدمات بخبرات، ومستهلكين يبحثون عن الجودة، جميعهم مفصولون بأسواق مجزأة. لماذا لا ننشئ منصة لتوحيدهم؟ تحولت هذه الفكرة في الترامواي إلى رؤية مشتركة مع لجريدي بوجمعة، زميل دراسات الماجستير. معًا، زرعوا بذور سوق الفلاح، مزجوا بين الشغف والتكنولوجيا والغرض.'
            },
            what_we_do: {
              title: 'شريك نموك',
              products: {
                title: 'منتجات وفيرة',
                description: 'من البذور الخصبة إلى الأدوات القوية والمنتجات الطازجة، استكشف حصادًا متنوعًا من السلع الزراعية من بائعين محليين موثوقين.'
              },
              services: {
                title: 'خدمات متخصصة',
                description: 'تواصل مع خبراء التربة، تأجير المعدات، أو العمالة الماهرة. منصتنا تربطك بالمحترفين الذين يغذون نجاحك.'
              },
              delivery: {
                title: 'توصيل سريع',
                description: 'شحننا الداخلي يضمن وصول طلباتك بسرعة، من الأدوات الصغيرة إلى الإمدادات الكبيرة، مباشرة إلى بوابة مزرعتك.'
              }
            },
            roots: {
              title: 'متجذرون في المعرفة، ننمو للأمام',
              description1: 'نحن يحياوي عبد الحليم ولجريدي بوجمعة، طلاب ماجستير نستغل طاقتنا الأكاديمية لخلق تأثير في العالم الحقيقي. سوق الفلاح هو عملنا المحبب، ولد من رغبة في تمكين العمود الفقري الزراعي للجزائر.',
              description2: 'مشروعنا يزدهر داخل حاضنة جامعتنا، وهو شرف يغذي دافعنا نحو التميز. سوق الفلاح هو ابتكار معترف به رسميًا، يمزج بين التكنولوجيا المتطورة والخدمة القلبية.',
              description3: 'حلمنا؟ زراعة واحة رقمية حيث يتصل المزارعون والبائعون والمستهلكون بسلاسة، مدفوعين بالازدهار عبر حقول الجزائر وما بعدها.'
            },
            why_choose_us: {
              title: 'لماذا تزرع مع سوق الفلاح؟',
              agri_centric: {
                title: 'مركز زراعي',
                description: 'مصمم خصيصًا للمزارعين'
              },
              all_in_one: {
                title: 'الكل في واحد',
                description: 'تسوق بسهولة'
              },
              dependable: {
                title: 'موثوق',
                description: 'شحن سريع'
              },
              community: {
                title: 'مجتمع',
                description: 'متحدون ننمو'
              },
              innovative: {
                title: 'مبتكر',
                description: 'مدعوم بالبحث'
              }
            },
            cta: {
              title: 'ازرع مستقبلك معنا',
              description: 'من توفير الإمدادات المميزة إلى التواصل مع الخدمات الممتازة أو توسيع نطاق بائعيك، سوق الفلاح هو شريكك في التقدم.',
              browse_products: 'تصفح المنتجات',
              find_services: 'ابحث عن الخدمات',
              join_soug: 'انضم إلى سوقنا'
            }
          },
          contact: {
            title: 'اتصل بسوق الفلاح',
            description: 'لا تتردد في التواصل معنا إذا واجهت أي مشاكل مع الموقع، أو لديك اقتراحات لنا، أو إذا كانت لديك أي مقترحات أو أسئلة تتعلق بشراكة محتملة أو خدمات. سنبذل قصارى جهدنا للرد عليك في أقرب وقت ممكن.',
            info: {
              address_label: 'العنوان',
              address: 'عين أزال، سطيف، الجزائر',
              email_label: 'البريد الإلكتروني',
              phone_label: 'الهاتف'
            },
            form: {
              title: 'اتصل بنا',
              email_placeholder: 'البريد الإلكتروني*',
              name_placeholder: 'اسمك*',
              phone_placeholder: 'رقم الهاتف',
              subject_placeholder: 'الموضوع*',
              subject_options: {
                general_inquiry: 'استفسار عام',
                partnership_proposal: 'اقتراح شراكة',
                technical_support: 'دعم فني',
                feedback_suggestion: 'تعليقات/اقتراحات',
                advertising: 'إعلانات',
                other: 'أخرى'
              },
              message_placeholder: 'الرسالة*',
              submit_button: 'إرسال',
              recaptcha_error: 'يرجى إكمال التحقق من reCAPTCHA.',
              required_fields_error: 'يرجى ملء جميع الحقول المطلوبة.',
              success_message: 'تم إرسال الرسالة بنجاح! (محاكاة الواجهة الأمامية)'
            },
            map_title: 'خريطة موقع جامعة فرحات عباس سطيف 1 - حرم البز'
          },
          login_page: {
            title: 'تسجيل الدخول',
            form: {
              email_label: 'عنوان البريد الإلكتروني',
              email_placeholder: 'you@example.farm',
              password_label: 'كلمة المرور',
              password_placeholder: 'أدخل كلمة المرور الخاصة بك',
              show_password: 'إظهار كلمة المرور',
              hide_password: 'إخفاء كلمة المرور',
              forgot_password: 'نسيت كلمة المرور؟',
              login_button: 'تسجيل الدخول',
              logging_in: 'جارٍ تسجيل الدخول...'
            },
            social_divider: 'أو تسجيل الدخول باستخدام',
            social: {
              facebook: 'فيسبوك',
              google: 'جوجل'
            },
            register_prompt: 'ليس لديك حساب؟',
            register_link: 'سجل الآن',
            seller_area: 'منطقة البائع',
            seller_login: 'تسجيل دخول البائع',
            seller_registration: 'تسجيل البائع',
            image_alt: 'رسم توضيحي لتسجيل الدخول'
          },
          register: {
            title: 'إنشاء حساب مزرعتك',
            form: {
              name_label: 'الاسم الكامل',
              name_placeholder: 'مثال: أحمد خالد',
              email_label: 'عنوان البريد الإلكتروني',
              email_placeholder: 'you@example.farm',
              password_label: 'كلمة المرور',
              password_placeholder: 'إنشاء كلمة مرور آمنة',
              show_password: 'إظهار كلمة المرور',
              hide_password: 'إخفاء كلمة المرور',
              confirm_password_label: 'تأكيد كلمة المرور',
              confirm_password_placeholder: 'أعد إدخال كلمة المرور',
              show_confirm_password: 'إظهار تأكيد كلمة المرور',
              hide_confirm_password: 'إخفاء تأكيد كلمة المرور',
              password_strength: 'قوة كلمة المرور',
              password_mismatch: 'كلمات المرور غير متطابقة.',
              password_too_weak: 'كلمة المرور ضعيفة جدًا. يرجى اختيار كلمة مرور أقوى تحتوي على أرقام، رموز، أو طول أكبر.',
              processing: 'جارٍ المعالجة...',
              submit_button: 'إنشاء الحساب وإرسال رمز التحقق'
            },
            strength: {
              very_weak: 'ضعيف جدًا',
              weak: 'ضعيف',
              fair: 'متوسط',
              good: 'جيد',
              strong: 'قوي'
            },
            social_divider: 'أو تابع باستخدام',
            social: {
              facebook: 'فيسبوك',
              google: 'جوجل'
            },
            login_prompt: 'هل لديك حساب بالفعل؟',
            login_link: 'تسجيل الدخول هنا',
            seller_area: 'هل أنت بائع؟',
            seller_login: 'تسجيل دخول البائع',
            seller_registration: 'تسجيل البائع',
            otp: {
              title: 'تحقق من بريدك الإلكتروني',
              description: 'أدخل رمز التحقق المكون من 6 أرقام المرسل إلى <strong>{email}</strong>. ينتهي صلاحية الرمز خلال 10 دقائق.',
              label: 'رمز التحقق (OTP)',
              placeholder: '------',
              invalid_otp: 'يرجى إدخال رمز التحقق المكون من 6 أرقام.',
              session_error: 'خطأ في الجلسة. يرجى المحاولة للتسجيل مرة أخرى.',
              resending: 'جارٍ إعادة إرسال رمز التحقق...',
              resend_error: 'لا يمكن إعادة إرسال رمز التحقق. يرجى بدء عملية التسجيل من جديد.',
              no_code: 'لم تتلق الرمز؟',
              resend: 'إعادة إرسال رمز التحقق',
              different_email: 'استخدام بريد إلكتروني مختلف',
              verifying: 'جارٍ التحقق...',
              submit_button: 'التحقق وإكمال التسجيل'
            },
            image_alt: 'سوق الفلاح - السوق الزراعي'
          },
          forgot_password: {
            title: 'نسيت كلمة المرور؟',
            description: 'أدخل عنوان بريدك الإلكتروني أدناه. إذا كان مسجلاً ومُحققًا، سنرسل لك رابط إعادة تعيين كلمة المرور.',
            form: {
              email_label: 'عنوان البريد الإلكتروني',
              email_placeholder: 'أدخل بريدك الإلكتروني المسجل',
              email_required: 'يرجى إدخال عنوان بريدك الإلكتروني.',
              sending: 'جارٍ إرسال الرابط...',
              submit_button: 'إرسال رابط إعادة تعيين كلمة المرور'
            },
            login_prompt: 'هل تتذكر كلمة المرور؟',
            login_link: 'تسجيل الدخول هنا'
          },
          reset_password: {
            title: 'تعيين كلمة مرور جديدة',
            description: 'يرجى إدخال وتأكيد كلمة المرور الجديدة أدناه.',
            form: {
              password_label: 'كلمة المرور الجديدة',
              password_placeholder: 'أدخل كلمة مرور جديدة (6 أحرف على الأقل)',
              show_password: 'إظهار كلمة المرور',
              hide_password: 'إخفاء كلمة المرور',
              confirm_password_label: 'تأكيد كلمة المرور الجديدة',
              confirm_password_placeholder: 'أعد إدخال كلمة المرور الجديدة',
              show_confirm_password: 'إظهار تأكيد كلمة المرور',
              hide_confirm_password: 'إخفاء تأكيد كلمة المرور',
              fields_required: 'يرجى ملء حقلي كلمة المرور.',
              password_too_short: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.',
              password_mismatch: 'كلمات المرور غير متطابقة.',
              invalid_token: 'رمز إعادة التعيين غير صالح أو مفقود.',
              invalid_link: 'رابط إعادة تعيين كلمة المرور غير صالح.',
              resetting: 'جارٍ إعادة التعيين...',
              submit_button: 'تعيين كلمة مرور جديدة'
            },
            login_prompt: 'العودة إلى',
            login_link: 'تسجيل الدخول'
          },
          dashboard: {
            total_orders: 'الطلبات',
            pending_orders: 'الطلبات المعلقة',
            cancelled_orders: 'الطلبات الملغاة',
            recent_orders: 'الطلبات الأخيرة',
            table: {
              order_id: 'معرف الطلب',
              price: 'السعر',
              payment_status: 'حالة الدفع',
              order_status: 'حالة الطلب',
              action: 'الإجراء',
              view: 'عرض',
              pay_now: 'ادفع الآن'
            }
          },
          dashboard_menu: {
            dashboard: 'لوحة التحكم',
            my_orders: 'طلباتي',
            my_bookings: 'حجوزاتي',
            wishlist: 'قائمة الرغبات',
            chat: 'الدردشة',
            change_password: 'تغيير كلمة المرور',
            logout: 'تسجيل الخروج'
          },
          order_details: {
            deliver_to: 'توصيل إلى',
            home: 'المنزل',
            email_to: 'البريد إلى',
            price: 'السعر',
            include_shipping: 'يشمل الشحن',
            payment_status: 'حالة الدفع',
            order_status: 'حالة الطلب',
            order_products: 'منتجات الطلب',
            brand: 'العلامة التجارية',
            quantity: 'الكمية',
            no_products: 'لا توجد منتجات متاحة',
            status: {
              paid: 'مدفوع',
              unpaid: 'غير مدفوع',
              pending: 'معلق',
              shipped: 'تم الشحن',
              delivered: 'تم التوصيل'
            }
          },
          orders: {
            my_orders: 'طلباتي',
            order_status: 'حالة الطلب',
            no_orders: 'لا توجد طلبات متاحة',
            table: {
              order_id: 'معرف الطلب',
              price: 'السعر',
              payment_status: 'حالة الدفع',
              order_status: 'حالة الطلب',
              action: 'الإجراء',
              view: 'عرض',
              pay_now: 'ادفع الآن'
            },
            status: {
              paid: 'مدفوع',
              unpaid: 'غير مدفوع',
              placed: 'تم الطلب',
              pending: 'معلق',
              cancelled: 'ملغى',
              warehouse: 'في المستودع'
            }
          },
          bookings: {
            my_bookings: 'حجوزاتي',
            no_bookings: 'لم تقم بإجراء أي حجوزات بعد.',
            book_service: 'حجز خدمة',
            na: 'غير متاح',
            table: {
              service: 'الخدمة',
              provider: 'المزود',
              date: 'التاريخ',
              time: 'الوقت',
              status: 'الحالة',
              booked_on: 'تم الحجز في',
              action: 'الإجراء',
              view: 'عرض'
            },
            status: {
              pending: 'معلق',
              confirmed: 'مؤكد',
              cancelled: 'ملغى',
              completed: 'مكتمل'
            }
          },
          booking_details: {
            title: 'تفاصيل الحجز',
            booked_on: 'تم الحجز في',
            not_found: 'تفاصيل الحجز غير موجودة.',
            na: 'غير متاح',
            service_provider: {
              title: 'الخدمة والمزود',
              service: 'الخدمة',
              price: 'السعر',
              provider: 'المزود',
              provider_contact: 'جهة اتصال المزود'
            },
            booking_info: {
              title: 'تفاصيل الحجز',
              requested_date: 'التاريخ المطلوب',
              requested_time: 'الوقت المطلوب',
              status: 'الحالة'
            },
            user_info: {
              title: 'معلوماتك',
              name: 'الاسم',
              phone: 'الهاتف'
            },
            notes: {
              title: 'ملاحظات إضافية'
            },
            status: {
              pending: 'معلق',
              confirmed: 'مؤكد',
              cancelled: 'ملغى',
              completed: 'مكتمل'
            }
          },
          change_password: {
            title: 'تغيير كلمة المرور',
            social_login_message: 'إدارة كلمة المرور غير متاحة للحسابات المسجلة باستخدام {method}. يرجى إدارة كلمة المرور من خلال مزود التواصل الاجتماعي الخاص بك.',
            success_message: 'تم تحديث كلمة المرور بنجاح!',
            form: {
              current_password: 'كلمة المرور الحالية',
              current_password_placeholder: 'أدخل كلمة المرور الحالية',
              new_password: 'كلمة المرور الجديدة',
              new_password_placeholder: 'أدخل كلمة مرور جديدة (6 أحرف على الأقل)',
              confirm_password: 'تأكيد كلمة المرور الجديدة',
              confirm_password_placeholder: 'أعد إدخال كلمة المرور الجديدة',
              toggle_current_password: 'تبديل رؤية كلمة المرور الحالية',
              toggle_new_password: 'تبديل رؤية كلمة المرور الجديدة',
              toggle_confirm_password: 'تبديل رؤية تأكيد كلمة المرور',
              update_password: 'تحديث كلمة المرور',
              updating: 'جارٍ التحديث...'
            },
            errors: {
              fill_all_fields: 'يرجى ملء جميع حقول كلمة المرور.',
              password_too_short: 'يجب أن تكون كلمة المرور الجديدة 6 أحرف على الأقل.',
              password_mismatch: 'كلمات المرور الجديدة غير متطابقة.',
              same_password: 'لا يمكن أن تكون كلمة المرور الجديدة نفس كلمة المرور القديمة.'
            }
          },
          chat: {
            title: 'الرسائل',
            placeholder: 'أدخل الرسالة',
            select_seller: 'اختر بائعًا',
            new_message: '{senderName} أرسل رسالة'
          },
          product_details: {
            product_details: 'تفاصيل المنتج',
            home: 'الرئيسية',
            price: 'السعر',
            shop_name: 'اسم المتجر',
            add_to_cart: 'أضف إلى السلة',
            buy_now: 'اشترِ الآن',
            chat_seller: 'الدردشة مع البائع',
            availability: 'التوفر',
            share_on: 'شارك على',
            in_stock: 'متوفر ({stock})',
            out_of_stock: 'غير متوفر',
            reviews: 'التقييمات',
            description: 'الوصف',
            related_products: 'المنتجات ذات الصلة',
            from_shop: 'من {shopName}',
            loading: 'جارٍ التحميل...'
          },
          shops: {
            products_page: 'صفحة المنتجات',
            shop: 'المتجر',
            filter_product: 'تصفية المنتجات',
            category: 'الفئة',
            price: 'السعر',
            rating: 'التقييم',
            products_count: '({count}) منتجات',
            sort_by: 'ترتيب حسب',
            low_to_high: 'السعر من الأقل إلى الأعلى',
            high_to_low: 'السعر من الأعلى إلى الأقل',
            latest_product: 'أحدث المنتجات'
          },
          shipping: {
            shipping_page: 'صفحة الشحن',
            shipping: 'الشحن',
            shipping_information: 'معلومات الشحن',
            name: 'الاسم',
            name_placeholder: 'الاسم',
            address: 'العنوان',
            address_placeholder: 'العنوان',
            phone: 'الهاتف',
            phone_placeholder: 'الهاتف',
            post: 'الرمز البريدي',
            post_placeholder: 'الرمز البريدي',
            province: 'الولاية',
            province_placeholder: 'الولاية',
            city: 'المدينة',
            city_placeholder: 'المدينة',
            area: 'المنطقة',
            area_placeholder: 'المنطقة',
            save_change: 'حفظ التغيير',
            deliver_to: 'توصيل إلى {name}',
            home: 'المنزل',
            change: 'تغيير',
            email_to: 'البريد إلى {email}',
            order_summary: 'ملخص الطلب',
            items_total: 'إجمالي العناصر ({count} عناصر)',
            delivery_fee: 'رسوم التوصيل',
            total_payment: 'إجمالي الدفع',
            total: 'الإجمالي',
            place_order: 'تقديم الطلب',
            brand: 'العلامة التجارية: {brand}'
          },
          payment: {
            order_summary: 'ملخص الطلب',
            items_and_shipping: ' الشحن والعناصر',
            total_amount: 'المبلغ الإجمالي',
            stripe: 'سترايب',
            cash_on_delivery: 'الدفع عند التسليم',
            pay_with_stripe: 'الدفع باستخدام سترايب',
            confirm_cash_on_delivery: 'تأكيد الدفع عند التسليم',
            cod_message: 'ستدفع المبلغ الإجمالي نقدًا عند تسليم طلبك. انقر على الزر أدناه لتأكيد طلبك.',
            confirm_cod_order: 'تأكيد طلب الدفع عند التسليم',
            error_order_details_missing: 'خطأ: تفاصيل الطلب مفقودة',
            error_message: 'لم نتمكن من العثور على التفاصيل اللازمة لدفع طلبك. قد يحدث هذا إذا قمت بتحديث الصفحة أو التنقل إلى هنا مباشرة.',
            return_to_cart: 'العودة إلى السلة'
          }
        },
      },
      fr: {
        translation: {
          login: 'Connexion',
          home: 'Accueil',
          products: 'Produits',
          services: 'Services',
          about_us: 'À propos',
          contact_us: 'Contactez-nous',
          support_24_7: 'Support 24/7',
          all_category: 'Toutes les catégories',
          select_category: 'Sélectionner une catégorie',
          search: 'Rechercher',
          search_placeholder: 'De quoi avez-vous besoin',
          footer: {
            useful_links: 'Liens utiles',
            links: {
              about_us: 'À propos de nous',
              about_our_shop: 'À propos de notre boutique',
              delivery_information: 'Informations de livraison',
              privacy_policy: 'Politique de confidentialité',
              services: 'Services',
              our_service: 'Notre service',
              company_profile: 'Profil de l’entreprise'
            },
            contact: {
              title: 'Contact',
              address: 'Adresse: centre-ville, Ain Azel, Sétif',
              phone: 'Téléphone: +213-0776771666',
              email: 'soug.elfalah@gmail.com'
            },
            copyright: 'Copyright © 2025 Tous droits réservés'
          },
          about: {
            hero: {
              title: 'SOUG EL-FALAH : Semer l’unité, récolter le progrès',
              description: 'Un souk numérique dynamique pour l’âme agricole de l’Algérie – unissant agriculteurs, services et innovation dans un écosystème prospère.'
            },
            story: {
              title: 'Un rêve de tramway prend racine',
              description1: 'Les grandes idées germent souvent dans des endroits inattendus. Pour SOUG EL-FALAH, c’est un trajet en tramway à travers les rues animées d’Alger qui a tout déclenché. Yahiaoui Abdelhalim, l’un de nos co-fondateurs, regardait par la fenêtre, observant le rythme de la vie quotidienne, et a imaginé un pont numérique pour la communauté agricole algérienne.',
              description2: 'Il a vu des agriculteurs avec des récoltes abondantes, des prestataires de services avec leur expertise, et des consommateurs en quête de qualité, tous séparés par des marchés fragmentés. Pourquoi ne pas créer une plateforme pour les unir ? Cette épiphanie en tramway est devenue une vision partagée avec Ledjridi Boudjama, un autre étudiant en master. Ensemble, ils ont planté les graines de SOUG EL-FALAH, mêlant passion, technologie et objectif.'
            },
            what_we_do: {
              title: 'Votre partenaire de croissance',
              products: {
                title: 'Produits abondants',
                description: 'Des graines fertiles aux outils robustes et produits frais, explorez une récolte diversifiée de biens agricoles provenant de vendeurs locaux de confiance.'
              },
              services: {
                title: 'Services experts',
                description: 'Accédez à des experts en sols, à la location d’équipements ou à une main-d’œuvre qualifiée. Notre plateforme vous connecte à des professionnels qui nourrissent votre succès.'
              },
              delivery: {
                title: 'Livraison rapide',
                description: 'Notre service de livraison interne garantit que vos commandes arrivent rapidement, des petits outils aux fournitures en vrac, directement à la porte de votre ferme.'
              }
            },
            roots: {
              title: 'Enracinés dans la connaissance, avançant vers l’avenir',
              description1: 'Nous sommes Yahiaoui Abdelhalim et Ledjridi Boudjama, étudiants en master canalisant notre énergie académique pour un impact réel. SOUG EL-FALAH est notre travail d’amour, né du désir de renforcer le pilier agricole de l’Algérie.',
              description2: 'Notre projet prospère au sein de l’incubateur de notre université, un honneur qui alimente notre quête d’excellence. SOUG EL-FALAH est une innovation officiellement reconnue, mêlant technologie de pointe et service sincère.',
              description3: 'Notre rêve ? Cultiver une oasis numérique où agriculteurs, vendeurs et consommateurs se connectent sans effort, favorisant la prospérité à travers les champs de l’Algérie et au-delà.'
            },
            why_choose_us: {
              title: 'Pourquoi semer avec SOUG EL-FALAH ?',
              agri_centric: {
                title: 'Centré sur l’agriculture',
                description: 'Conçu pour les agriculteurs'
              },
              all_in_one: {
                title: 'Tout-en-un',
                description: 'Achetez facilement'
              },
              dependable: {
                title: 'Fiable',
                description: 'Livraison rapide'
              },
              community: {
                title: 'Communauté',
                description: 'Unis, nous grandissons'
              },
              innovative: {
                title: 'Innovant',
                description: 'Soutenu par la recherche'
              }
            },
            cta: {
              title: 'Plantez votre avenir avec nous',
              description: 'De l’approvisionnement en fournitures de qualité à la connexion avec des services de premier ordre ou à l’élargissement de votre portée en tant que vendeur, SouG El Falah est votre partenaire pour le progrès.',
              browse_products: 'Parcourir les produits',
              find_services: 'Trouver des services',
              join_soug: 'Rejoindre notre SOUG'
            }
          },
          contact: {
            title: 'Contactez SOUG EL-FALAH',
            description: 'N’hésitez pas à nous contacter si vous rencontrez des problèmes avec le site, si vous avez des suggestions, ou si vous avez des propositions ou des questions concernant un éventuel partenariat ou des services. Nous ferons de notre mieux pour vous répondre le plus rapidement possible.',
            info: {
              address_label: 'Adresse',
              address: 'Ain Azel, Sétif, Algérie',
              email_label: 'E-mail',
              phone_label: 'Téléphone'
            },
            form: {
              title: 'Contactez-nous',
              email_placeholder: 'E-mail*',
              name_placeholder: 'Votre nom*',
              phone_placeholder: 'Numéro de téléphone',
              subject_placeholder: 'Objet*',
              subject_options: {
                general_inquiry: 'Demande générale',
                partnership_proposal: 'Proposition de partenariat',
                technical_support: 'Support technique',
                feedback_suggestion: 'Commentaires/Suggestions',
                advertising: 'Publicité',
                other: 'Autre'
              },
              message_placeholder: 'Message*',
              submit_button: 'ENVOYER',
              recaptcha_error: 'Veuillez compléter la vérification reCAPTCHA.',
              required_fields_error: 'Veuillez remplir tous les champs requis.',
              success_message: 'Message envoyé avec succès ! (Simulation frontend)'
            },
            map_title: 'Carte de localisation de l’Université Ferhat Abbas Sétif 1 - Campus El Bez'
          },
          login_page: {
            title: 'Bon retour !',
            form: {
              email_label: 'Adresse e-mail',
              email_placeholder: 'vous@exemple.farm',
              password_label: 'Mot de passe',
              password_placeholder: 'Entrez votre mot de passe',
              show_password: 'Afficher le mot de passe',
              hide_password: 'Masquer le mot de passe',
              forgot_password: 'Mot de passe oublié ?',
              login_button: 'Connexion',
              logging_in: 'Connexion en cours...'
            },
            social_divider: 'Ou connectez-vous avec',
            social: {
              facebook: 'Facebook',
              google: 'Google'
            },
            register_prompt: 'Vous n’avez pas de compte ?',
            register_link: 'Inscrivez-vous maintenant',
            seller_area: 'Espace vendeur',
            seller_login: 'Connexion vendeur',
            seller_registration: 'Inscription vendeur',
            image_alt: 'Illustration de connexion'
          },
          register: {
            title: 'Créez votre compte ',
            form: {
              name_label: 'Nom complet',
              name_placeholder: 'ex., Pierre Dubois',
              email_label: 'Adresse e-mail',
              email_placeholder: 'vous@exemple.farm',
              password_label: 'Mot de passe',
              password_placeholder: 'Créez un mot de passe sécurisé',
              show_password: 'Afficher le mot de passe',
              hide_password: 'Masquer le mot de passe',
              confirm_password_label: 'Confirmer le mot de passe',
              confirm_password_placeholder: 'Ré-entrez votre mot de passe',
              show_confirm_password: 'Afficher la confirmation du mot de passe',
              hide_confirm_password: 'Masquer la confirmation du mot de passe',
              password_strength: 'Force du mot de passe',
              password_mismatch: 'Les mots de passe ne correspondent pas.',
              password_too_weak: 'Le mot de passe est trop faible. Veuillez choisir un mot de passe plus fort incluant des chiffres, des symboles ou une longueur supérieure.',
              processing: 'Traitement en cours...',
              submit_button: 'Créer un compte et envoyer le code OTP'
            },
            strength: {
              very_weak: 'Très faible',
              weak: 'Faible',
              fair: 'Moyen',
              good: 'Bon',
              strong: 'Fort'
            },
            social_divider: 'Ou continuez avec',
            social: {
              facebook: 'Facebook',
              google: 'Google'
            },
            login_prompt: 'Vous avez déjà un compte ?',
            login_link: 'Connectez-vous ici',
            seller_area: 'Êtes-vous vendeur ?',
            seller_login: 'Connexion vendeur',
            seller_registration: 'Inscription vendeur',
            otp: {
              title: 'Vérifiez votre e-mail',
              description: 'Entrez le code à 6 chiffres envoyé à <strong>{email}</strong>. Le code expire dans 10 minutes.',
              label: 'Code de vérification (OTP)',
              placeholder: '------',
              invalid_otp: 'Veuillez entrer le code OTP à 6 chiffres.',
              session_error: 'Erreur de session. Veuillez réessayer l’inscription.',
              resending: 'Réenvoi du code OTP...',
              resend_error: 'Impossible de renvoyer le code OTP. Veuillez recommencer le processus d’inscription.',
              no_code: 'Vous n’avez pas reçu le code ?',
              resend: 'Renvoyer le code OTP',
              different_email: 'Utiliser un e-mail différent',
              verifying: 'Vérification en cours...',
              submit_button: 'Vérifier et compléter l’inscription'
            },
            image_alt: 'Soug El Falah - Marché agricole'
          },
          forgot_password: {
            title: 'Mot de passe oublié ?',
            description: 'Entrez votre adresse e-mail ci-dessous. Si elle est enregistrée et vérifiée, nous vous enverrons un lien de réinitialisation de mot de passe.',
            form: {
              email_label: 'Adresse e-mail',
              email_placeholder: 'Entrez votre e-mail enregistré',
              email_required: 'Veuillez entrer votre adresse e-mail.',
              sending: 'Envoi du lien...',
              submit_button: 'Envoyer le lien de réinitialisation du mot de passe'
            },
            login_prompt: 'Vous souvenez-vous de votre mot de passe ?',
            login_link: 'Connectez-vous ici'
          },
          reset_password: {
            title: 'Définir un nouveau mot de passe',
            description: 'Veuillez entrer et confirmer votre nouveau mot de passe ci-dessous.',
            form: {
              password_label: 'Nouveau mot de passe',
              password_placeholder: 'Entrez le nouveau mot de passe (min. 6 caractères)',
              show_password: 'Afficher le mot de passe',
              hide_password: 'Masquer le mot de passe',
              confirm_password_label: 'Confirmer le nouveau mot de passe',
              confirm_password_placeholder: 'Ré-entrez le nouveau mot de passe',
              show_confirm_password: 'Afficher la confirmation du mot de passe',
              hide_confirm_password: 'Masquer la confirmation du mot de passe',
              fields_required: 'Veuillez remplir les deux champs de mot de passe.',
              password_too_short: 'Le mot de passe doit comporter au moins 6 caractères.',
              password_mismatch: 'Les mots de passe ne correspondent pas.',
              invalid_token: 'Jeton de réinitialisation invalide ou manquant.',
              invalid_link: 'Lien de réinitialisation de mot de passe invalide.',
              resetting: 'Réinitialisation en cours...',
              submit_button: 'Définir le nouveau mot de passe'
            },
            login_prompt: 'Retourner à',
            login_link: 'Connexion'
          },
          dashboard: {
            total_orders: 'Commandes',
            pending_orders: 'Commandes en attente',
            cancelled_orders: 'Commandes annulées',
            recent_orders: 'Commandes récentes',
            table: {
              order_id: 'ID de commande',
              price: 'Prix',
              payment_status: 'Statut de paiement',
              order_status: 'Statut de la commande',
              action: 'Action',
              view: 'Voir',
              pay_now: 'Payer maintenant'
            }
          },
          dashboard_menu: {
            dashboard: 'Tableau de bord',
            my_orders: 'Mes commandes',
            my_bookings: 'Mes réservations',
            wishlist: 'Liste de souhaits',
            chat: 'Chat',
            change_password: 'Changer le mot de passe',
            logout: 'Déconnexion'
          },
          order_details: {
            deliver_to: 'Livrer à',
            home: 'Domicile',
            email_to: 'E-mail à',
            price: 'Prix',
            include_shipping: 'Frais de livraison inclus',
            payment_status: 'Statut de paiement',
            order_status: 'Statut de la commande',
            order_products: 'Produits de la commande',
            brand: 'Marque',
            quantity: 'Quantité',
            no_products: 'Aucun produit disponible',
            status: {
              paid: 'Payé',
              unpaid: 'Non payé',
              pending: 'En attente',
              shipped: 'Expédié',
              delivered: 'Livré'
            }
          },
          orders: {
            my_orders: 'Mes commandes',
            order_status: 'Statut de la commande',
            no_orders: 'Aucune commande disponible',
            table: {
              order_id: 'ID de commande',
              price: 'Prix',
              payment_status: 'Statut de paiement',
              order_status: 'Statut de la commande',
              action: 'Action',
              view: 'Voir',
              pay_now: 'Payer maintenant'
            },
            status: {
              paid: 'Payé',
              unpaid: 'Non payé',
              placed: 'Passée',
              pending: 'En attente',
              cancelled: 'Annulée',
              warehouse: 'Entrepôt'
            }
          },
          bookings: {
            my_bookings: 'Mes réservations',
            no_bookings: 'Vous n’avez pas encore effectué de réservations.',
            book_service: 'Réserver un service',
            na: 'N/A',
            table: {
              service: 'Service',
              provider: 'Fournisseur',
              date: 'Date',
              time: 'Heure',
              status: 'Statut',
              booked_on: 'Réservé le',
              action: 'Action',
              view: 'Voir'
            },
            status: {
              pending: 'En attente',
              confirmed: 'Confirmé',
              cancelled: 'Annulé',
              completed: 'Terminé'
            }
          },
          booking_details: {
            title: 'Détails de la réservation',
            booked_on: 'Réservé le',
            not_found: 'Détails de la réservation non trouvés.',
            na: 'N/A',
            service_provider: {
              title: 'Service et fournisseur',
              service: 'Service',
              price: 'Prix',
              provider: 'Fournisseur',
              provider_contact: 'Contact du fournisseur'
            },
            booking_info: {
              title: 'Détails de la réservation',
              requested_date: 'Date demandée',
              requested_relaxing_time: 'Heure demandée',
              status: 'Statut'
            },
            user_info: {
              title: 'Vos informations',
              name: 'Nom',
              phone: 'Téléphone'
            },
            notes: {
              title: 'Notes supplémentaires'
            },
            status: {
              pending: 'En attente',
              confirmed: 'Confirmé',
              cancelled: 'Annulé',
              completed: 'Terminé'
            }
          },
          change_password: {
            title: 'Changer votre mot de passe',
            social_login_message: 'La gestion du mot de passe n’est pas disponible pour les comptes enregistrés via {method}. Veuillez gérer votre mot de passe via votre fournisseur social.',
            success_message: 'Mot de passe mis à jour avec succès !',
            form: {
              current_password: 'Mot de passe actuel',
              current_password_placeholder: 'Entrez votre mot de passe actuel',
              new_password: 'Nouveau mot de passe',
              new_password_placeholder: 'Entrez le nouveau mot de passe (min. 6 caractères)',
              confirm_password: 'Confirmer le nouveau mot de passe',
              confirm_password_placeholder: 'Ré-entrez le nouveau mot de passe',
              toggle_current_password: 'Basculer la visibilité du mot de passe actuel',
              toggle_new_password: 'Basculer la visibilité du nouveau mot de passe',
              toggle_confirm_password: 'Basculer la visibilité de la confirmation du mot de passe',
              update_password: 'Mettre à jour le mot de passe',
              updating: 'Mise à jour en cours...'
            },
            errors: {
              fill_all_fields: 'Veuillez remplir tous les champs de mot de passe.',
              password_too_short: 'Le nouveau mot de passe doit comporter au moins 6 caractères.',
              password_mismatch: 'Les nouveaux mots de passe ne correspondent pas.',
              same_password: 'Le nouveau mot de passe ne peut pas être le même que l’ancien.'
            }
          },
          chat: {
            title: 'Message',
            placeholder: 'Entrez le message',
            select_seller: 'Sélectionner un vendeur',
            new_message: '{senderName} a envoyé un message'
          },
          product_details: {
            product_details: 'Détails du produit',
            home: 'Accueil',
            price: 'Prix',
            shop_name: 'Nom de la boutique',
            add_to_cart: 'Ajouter au panier',
            buy_now: 'Acheter maintenant',
            chat_seller: 'Discuter avec le vendeur',
            availability: 'Disponibilité',
            share_on: 'Partager sur',
            in_stock: 'En stock ({stock})',
            out_of_stock: 'Rupture de stock',
            reviews: 'avis',
            description: 'Description',
            related_products: 'Produits associés',
            from_shop: 'De {shopName}',
            loading: 'Chargement...'
          },
          shops: {
            products_page: 'Page des produits',
            shop: 'Boutique',
            filter_product: 'Filtrer les produits',
            category: 'Catégorie',
            price: 'Prix',
            rating: 'Évaluation',
            products_count: '({count}) Produits',
            sort_by: 'Trier par',
            low_to_high: 'Prix du plus bas au plus haut',
            high_to_low: 'Prix du plus haut au plus bas',
            latest_product: 'Produit le plus récent'
          },
          shipping: {
            shipping_page: 'Page de livraison',
            shipping: 'Livraison',
            shipping_information: 'Informations de livraison',
            name: 'Nom',
            name_placeholder: 'Nom',
            address: 'Adresse',
            address_placeholder: 'Adresse',
            phone: 'Téléphone',
            phone_placeholder: 'Téléphone',
            post: 'Code postal',
            post_placeholder: 'Code postal',
            province: 'Province',
            province_placeholder: 'Province',
            city: 'Ville',
            city_placeholder: 'Ville',
            area: 'Zone',
            area_placeholder: 'Zone',
            save_change: 'Enregistrer les modifications',
            deliver_to: 'Livrer à {name}',
            home: 'Domicile',
            change: 'Modifier',
            email_to: 'E-mail à {email}',
            order_summary: 'Résumé de la commande',
            items_total: 'Total des articles ({count} articles)',
            delivery_fee: 'Frais de livraison',
            total_payment: 'Paiement total',
            total: 'Total',
            place_order: 'Passer la commande',
            brand: 'Marque : {brand}'
          },
          payment: {
            order_summary: 'Résumé de la commande',
            items_and_shipping: 'Article(s) et livraison',
            total_amount: 'Montant total',
            stripe: 'Stripe',
            cash_on_delivery: 'Paiement à la livraison',
            pay_with_stripe: 'Payer avec Stripe',
            confirm_cash_on_delivery: 'Confirmer le paiement à la livraison',
            cod_message: 'Vous paierez le montant total en espèces lors de la livraison de votre commande. Cliquez sur le bouton ci-dessous pour confirmer votre commande.',
            confirm_cod_order: 'Confirmer la commande COD',
            error_order_details_missing: 'Erreur : Détails de la commande manquants',
            error_message: 'Nous n\'avons pas pu trouver les détails nécessaires pour le paiement de votre commande. Cela peut se produire si vous avez actualisé la page ou navigué directement ici.',
            return_to_cart: 'Retourner au panier'
          }
        },
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie']
    }
  });

export default i18next;